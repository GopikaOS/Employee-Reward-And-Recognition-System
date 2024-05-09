package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.service.UserService;

@RestController
@RequestMapping(value = "/user")
@CrossOrigin(origins = "*")
public class CountController {
	
	
	@Autowired
	private UserService userService;
    @GetMapping("/activeUsersCount")
    public ResponseEntity<Long> getActiveUserCount() {
    long countOfCurrentUsers = userService.getActiveUserCount();
    return ResponseEntity.ok(countOfCurrentUsers);   
}
    @GetMapping("/activeEmployeesCount")
    public ResponseEntity<Long> getActiveEmployeesCount() {
    long countOfCurrentEmployeesUsers = userService.getActiveEmployeesCount();
    return ResponseEntity.ok(countOfCurrentEmployeesUsers);   
}
    @GetMapping("/adminCount")
    public ResponseEntity<Long> getAdminCount() {
    long countOfAdmin = userService.getAdminCount();
    return ResponseEntity.ok(countOfAdmin);   
}
}
