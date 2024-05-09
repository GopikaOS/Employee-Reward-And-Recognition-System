package com.example.demo.service;
import java.util.List;
import org.springframework.http.ResponseEntity;
import com.example.demo.dto.ProductPurchaseDto;
import com.example.demo.dto.UserPointDto;

import com.example.demo.model.TransactionHistoryModel;

import com.example.demo.model.UserModel;

public interface UserService {

	UserModel addUser(UserModel userModel);
	UserModel findByEmail(String email);
	public List<UserModel> getEmployeeList();
	public String addPoint(UserPointDto userPointDto);
	void deleteUser(Long id);
	String updateUser(UserModel userModel, Long id);
	ResponseEntity<?> purchase(ProductPurchaseDto productPurchaseDto);
	UserModel fetchUserdetailsById(Long id);
	List<UserModel> findAllByOrderByTotalBytesPoints();
	List<UserModel> findAllEmployees();
	List<TransactionHistoryModel> getTransactionHistory();
	List<TransactionHistoryModel> findByUserId(int id);
	long getActiveEmployeesCount();
	long getActiveUserCount();
	long getAdminCount();
	
	
	
	
	
	
		
}
