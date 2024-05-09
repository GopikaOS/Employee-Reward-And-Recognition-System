package com.example.demo.controller;

import java.util.List;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.dto.LoginDto;
import com.example.demo.dto.ProductPurchaseDto;
import com.example.demo.dto.UserPointDto;
import com.example.demo.model.RewardModel;
import com.example.demo.model.TransactionHistoryModel;
import com.example.demo.model.UserModel;
import com.example.demo.service.RewardService;
import com.example.demo.service.UserService;
import jakarta.validation.Valid;

@RestController
@RequestMapping(value = "/user")
@CrossOrigin(origins = "*")
public class Controller {

	@Autowired
	private UserService userService;

	@Autowired
	private RewardService rewardService;

	

//	to login 
	@PostMapping("/login")
	public UserModel login(@RequestBody LoginDto user) {
		UserModel currentUser = userService.findByEmail(user.getEmail());
		if (currentUser != null && BCrypt.checkpw(user.getPassword(), currentUser.getPassword())) {
			return currentUser;
		} else {
			return null;
		}
	}

//	to adding users
	@PostMapping("/adduser")
	public UserModel addAdmin(@Valid @RequestBody UserModel userModel) {
		return userService.addUser(userModel);
	}

//	for adding awards
	@PostMapping("/addawards")
	public RewardModel addAwards(@Valid @RequestBody RewardModel rewardModel) {
		return rewardService.addAwards(rewardModel);
	}

	// for updating user
	@PutMapping("update/id/{id}")
	public String updateUser(@PathVariable String id, @Valid @RequestBody UserModel userModel) {
		id = id.replaceAll("[{}]", "");
		System.out.println(id);
		Long userId = Long.parseLong(id);
		System.out.println(id);

		return userService.updateUser(userModel, userId);
	}

//for getting awards
	@GetMapping("/getawards")
	public List<RewardModel> getAwardList() {
		return rewardService.getAwardList();
	}



// for getting users
	@GetMapping("/getemployees")
	public List<UserModel> getEmployeeList() {
		return userService.getEmployeeList();
	}

//for adding points
	@PostMapping("/addpoints")
	public String addPoint(@RequestBody UserPointDto userPointDto) {
		return userService.addPoint(userPointDto);
	}

//for deleting user
	@DeleteMapping("/deleteUser/{id}")
	public void deleteUser(@PathVariable Long id) {
		userService.deleteUser(id);
	}

	@PostMapping("purchase/product")
	public ResponseEntity<?> purchase(@RequestBody ProductPurchaseDto productPurchaseDto) {
		return userService.purchase(productPurchaseDto);
	}


//	for fetching purchasing history by id 
	@GetMapping("/purchasinghistory/id/{id}")
	public List<TransactionHistoryModel> getPurchasingHistory(@PathVariable int id) {
	    return userService.findByUserId(id);
	}

		
	
//for fetching employee and Admin
	@GetMapping("/fetchUserDetailsById/id/{id}")
	public UserModel fetchUserDetailsById(@PathVariable Long id) {
		return userService.fetchUserdetailsById(id);
	}

//for finding the top performer 
	@GetMapping("/topperformer")
	public List<UserModel> findTopPerformer() {
		List<UserModel> user = userService.findAllByOrderByTotalBytesPoints();
		return user;
	}

//	for fetching the employees
	@GetMapping("/employees")
	public List<UserModel> findEmployees() {
		List<UserModel> user = userService.findAllEmployees();
		return user;
	}

//	for getting all transaction
	@GetMapping("/transaction")
	public List<TransactionHistoryModel> getTransactionHistory() {
		return userService.getTransactionHistory();
	}




}
