package com.example.demo.serviceImpl;
import java.time.LocalDate;
import java.util.List;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.example.demo.dto.ProductDetails;
import com.example.demo.dto.ProductPurchaseDto;
import com.example.demo.dto.UserPointDto;
import com.example.demo.model.ProductModel;
import com.example.demo.model.RewardModel;
import com.example.demo.model.TransactionHistoryModel;
import com.example.demo.model.UserModel;
import com.example.demo.repo.ProductRepo;
import com.example.demo.repo.RewardRepo;
import com.example.demo.repo.TransactionHistoryRepo;
import com.example.demo.repo.UserRepo;
import com.example.demo.service.UserService;
import jakarta.transaction.Transactional;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepo userRepo;
	@Autowired
	private RewardRepo pointRepo;
	@Autowired
	private ProductRepo productRepo;
	@Autowired
	private TransactionHistoryRepo transacHistoryRepo;

	public UserModel findByEmail(String email) {
		return userRepo.findByEmail(email);
	}

//adding user
	@Override
	public UserModel addUser(UserModel userModel) {
		String hashedPassword = BCrypt.hashpw(userModel.getPassword(), BCrypt.gensalt());
		userModel.setPassword(hashedPassword);
		return userRepo.save(userModel);
	}

	@Override
	public List<UserModel> getEmployeeList() {
		return userRepo.findAllUsersByDeletedFalse();
	}
	
//	Adding point to the users

	@Override
	@Transactional
	public String addPoint(UserPointDto userPointDto) {
		List<Long> listOfUserIds = userPointDto.getId();

		RewardModel rewardModel = pointRepo.findById(userPointDto.getRewardId()).get();
		 List<UserModel>listOfUsers =rewardModel.getListOfUsers();
		 
		Long bytePoints = rewardModel.getBytesPoints();

		for (Long id : listOfUserIds) {

			UserModel userModel = userRepo.findById(id).get();
			listOfUsers.add(userModel);
			System.out.println(userModel.getName());
			Long currentBytepoints = userModel.getCurrentBytePoints();
			if (currentBytepoints == null) {
				currentBytepoints = 0L;
			}
			Long totalBytePoints = userModel.getTotalBytesPoints();

			if (totalBytePoints == null) {
				totalBytePoints = 0L;
			}
			userModel.setCurrentBytePoints(currentBytepoints + bytePoints);
			userModel.setTotalBytesPoints(totalBytePoints + bytePoints);
//			for getting all transaction
			TransactionHistoryModel transactionHistoryModel = new 	TransactionHistoryModel();
			transactionHistoryModel.setUser(userModel);
			transactionHistoryModel.setBytesPoint(bytePoints);
			transactionHistoryModel.setDate(LocalDate.now());
			transactionHistoryModel.setStatus("credited");
			transactionHistoryModel.setItemName(rewardModel.getAwardName());
			transactionHistoryModel.setUserName(userModel.getName());
			
			userRepo.save(userModel);
			transacHistoryRepo.save(transactionHistoryModel);
		}
		
		rewardModel.setListOfUsers(listOfUsers);
		pointRepo.save(rewardModel);
		return "Points updated";
	}
//for soft deleting user
	@Override
	public void deleteUser(Long id) {
		UserModel userModel = new UserModel();
		userModel = userRepo.findById(id).get();
		userModel.setDeleted(true);
		userRepo.save(userModel);

	}
	
	@Override
	@Transactional
	public ResponseEntity<?> purchase(ProductPurchaseDto productPurchaseDto) {
		UserModel userModel = userRepo.findById(productPurchaseDto.getUserId()).get();
		Long userCurrentBytePoints = userModel.getCurrentBytePoints();
		List<ProductDetails> productsDetailsList = productPurchaseDto.getProductsDetails();
		// for checking productQuantity
		Long totalBytesRequiredToPurchase = 0L;
		for (ProductDetails productDetails : productsDetailsList) {
			Long productId = productDetails.getProductId();
			ProductModel productModel = productRepo.findById(productId).get();
			Long quantity = productDetails.getQuantity();
			if (quantity > productModel.getInStock()) {
				return new ResponseEntity<>(productModel.getProductName() + " is out of stock", HttpStatus.BAD_REQUEST);
			}
			String totalBytesrequired = productModel.getBytesPoints();
			Long totalRequiredBytePoints = Long.parseLong(totalBytesrequired);
			totalBytesRequiredToPurchase = totalBytesRequiredToPurchase + (quantity * totalRequiredBytePoints);
		}
		if (totalBytesRequiredToPurchase > userModel.getCurrentBytePoints()) {
			return new ResponseEntity<String>("Not enough bytespoints to purchase", HttpStatus.BAD_REQUEST);
		} 
		userModel.setCurrentBytePoints(userCurrentBytePoints - totalBytesRequiredToPurchase);

		for (ProductDetails productDetails : productsDetailsList) {

			Long productId = productDetails.getProductId();
			ProductModel productModel = productRepo.findById(productId).get();
			Long quantity = productDetails.getQuantity();
			productModel.setInStock(productModel.getInStock() - quantity);
			String bytePoints = productModel.getBytesPoints();
			Long bytePointsInLong = Long.parseLong(bytePoints);
			
//			for all transaction
			
			TransactionHistoryModel transactionHistoryModel = new 	TransactionHistoryModel();
			transactionHistoryModel.setUser(userModel);
			transactionHistoryModel.setBytesPoint(bytePointsInLong * quantity);
//			transactionHistoryModel.setBytesPoint(bytePointsInLong);
			transactionHistoryModel.setDate(LocalDate.now());
			transactionHistoryModel.setStatus("Debited");
			transactionHistoryModel.setItemName(productModel.getProductName());
			transactionHistoryModel.setUserName(userModel.getName());
			transactionHistoryModel.setPicture(productModel.getPicture());
			userRepo.save(userModel);
			productRepo.save(productModel);
			transacHistoryRepo.save(transactionHistoryModel);
		}
		
		return new ResponseEntity<String>("Success", HttpStatus.ACCEPTED);
	}


//	for updating user details

	@Override
	public String updateUser(UserModel updatedModel, Long id) {
		UserModel updatedUser = userRepo.findById(id).get();
		updatedUser.setName(updatedModel.getName());
		updatedUser.setEmail(updatedModel.getEmail());
		updatedUser.setPhoneNumber(updatedModel.getPhoneNumber());
		updatedUser.setRole(updatedModel.getRole());
		updatedUser.setTotalBytesPoints(updatedModel.getTotalBytesPoints());
		updatedUser.setCurrentBytePoints(updatedUser.getCurrentBytePoints());
		userRepo.save(updatedUser);
		return "userDetailsUpdated";
	}


	@Override
	public UserModel fetchUserdetailsById(Long id) {
		return userRepo.findById(id).get();
	}

//	top performer
	@Override
	public List<UserModel> findAllByOrderByTotalBytesPoints() {
		List<UserModel> topPerformer = userRepo.findTopPerformer();
		return topPerformer;

	}
	
//to fetch the employees
	@Override
	public List<UserModel> findAllEmployees() {
	List<UserModel> employees = userRepo.findByRoleEmployee();
		return employees;
	}
//	//for all transaction
		@Override
		public List<TransactionHistoryModel>getTransactionHistory() {
			return transacHistoryRepo.findAll();
		}
//		for fetching orderHistory
		@Override
		public List<TransactionHistoryModel> findByUserId(int id) {
			return transacHistoryRepo.findByUserId(id);
		}

//		for finding count of active users
		@Override
		public long getActiveUserCount() {
			return userRepo.getActiveUserCount();
		}
//      for finding count of ActiveEmployees
		@Override
		public long getActiveEmployeesCount() {
			return userRepo.getActiveEmployeesCount();
		}
		
//		for finding number of employees
		@Override
		public long getAdminCount() {
			return userRepo.getAdminCount();
		}

		
	
		



	

		
		

}
