package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.model.ProductModel;
import com.example.demo.service.ProductService;

@RestController
@RequestMapping(value = "/user")
@CrossOrigin(origins = "*")
public class ProductController {
	@Autowired
	private ProductService productService;
	
	// for adding product 
		@PostMapping(value = "/addproduct")
		public ProductModel addProduct(@RequestParam("file") MultipartFile files,
			@RequestParam("productData") String productData) {
			return productService.addProduct(productData, files);
		}

//		for getting product
		@GetMapping("/getproducts")
		public List<ProductModel> getProductList() {
			return productService.getProductList();
		}

//		for deleting product
		@DeleteMapping("/deleteproduct/{id}")
		public void deleteProduct(@PathVariable Long id) {
			productService.deleteProduct(id);
		}
}
