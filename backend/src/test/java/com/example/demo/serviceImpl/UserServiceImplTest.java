
package com.example.demo.serviceImpl;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.example.demo.dto.ProductDetails;
import com.example.demo.dto.ProductPurchaseDto;
import com.example.demo.dto.UserPointDto;
import com.example.demo.model.ProductModel;
import com.example.demo.model.RewardModel;
import com.example.demo.model.UserModel;
import com.example.demo.repo.ProductRepo;
import com.example.demo.repo.RewardRepo;
import com.example.demo.repo.TransactionHistoryRepo;
import com.example.demo.repo.UserRepo;

import jakarta.transaction.Transactional;

	@ExtendWith(MockitoExtension.class)
	public class UserServiceImplTest {

	    @Mock
	    private UserRepo userRepo;
	    
	    @Mock
	    private RewardRepo pointRepo;
	    
	    @Mock
	    private ProductRepo productRepo;
	    
	    @Mock
	    private TransactionHistoryRepo transacHistoryRepo;

	    @InjectMocks
	    private UserServiceImpl userService;
	    private UserModel mockUserModel;
	    private RewardModel mockRewardModel;
	    private ProductModel mockProductModel;

	    @BeforeEach
	    public void setUp() {
	        mockUserModel = new UserModel();
	        mockUserModel.setId(1L);
	        mockUserModel.setName("Test User");
	        mockUserModel.setEmail("test@example.com");
	        mockUserModel.setPassword("test123");
	        mockUserModel.setCurrentBytePoints(1000L);
	        
	        mockRewardModel = new RewardModel();
	        mockRewardModel.setAwardId(1L);
	        mockRewardModel.setBytesPoints(100L);
	        
	        mockProductModel = new ProductModel();
	        mockProductModel.setProductId(1L);;
	        mockProductModel.setInStock(10L);
	        mockProductModel.setBytesPoints("50");
	       
	    }

	    @Test
	    public void testAddUser() {
	        when(userRepo.save(mockUserModel)).thenReturn(mockUserModel);

	        UserModel savedUser = userService.addUser(mockUserModel);

	        assertEquals(mockUserModel, savedUser);
	    }

	    // Example test for addPoint method
	    @Test
	    @Transactional
	    public void testAddPoint() {
	        List<Long> userIds = new ArrayList<>();
	        userIds.add(1L);
	        UserPointDto userPointDto = new UserPointDto();
	        userPointDto.setId(userIds);
	        userPointDto.setRewardId(1L);
	        when(pointRepo.findById(1L)).thenReturn(Optional.of(mockRewardModel));
	        when(userRepo.findById(1L)).thenReturn(Optional.of(mockUserModel));  
	        String result = userService.addPoint(userPointDto); 
	        assertEquals("Points updated", result);
	    }

	    // Example test for purchase method
	    @Test
	    @Transactional
	    public void testPurchase() {
	        ProductDetails productDetails = new ProductDetails();
	        productDetails.setProductId(1L);
	        productDetails.setQuantity(1L);
	        List<ProductDetails> productDetailsList = new ArrayList<>();
	        productDetailsList.add(productDetails);
	        ProductPurchaseDto productPurchaseDto = new ProductPurchaseDto();
	        productPurchaseDto.setUserId(1L);
	        productPurchaseDto.setProductsDetails(productDetailsList);
	        
	        when(userRepo.findById(1L)).thenReturn(Optional.of(mockUserModel));
	        when(productRepo.findById(1L)).thenReturn(Optional.of(mockProductModel));
	        
	        ResponseEntity<?> result = userService.purchase(productPurchaseDto);  
	        assertEquals(HttpStatus.ACCEPTED, result.getStatusCode());
	        assertEquals("Success", result.getBody());
	    }
	}



