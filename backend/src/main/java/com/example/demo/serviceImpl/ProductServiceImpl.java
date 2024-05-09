package com.example.demo.serviceImpl;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.example.demo.model.ProductModel;
import com.example.demo.model.UserModel;
import com.example.demo.repo.ProductRepo;
import com.example.demo.service.ProductService;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class ProductServiceImpl implements ProductService {	
	@Autowired
	private ProductRepo productRepo;	
	@Override
		public ProductModel addProduct( String productData, MultipartFile files) {
//	data is obtained as a string in front-end so in back-end we changed that in to object by using object mapping
		ProductModel productModel =new ProductModel();
		try {
			ObjectMapper objectMapper = new ObjectMapper();
			productModel =objectMapper.readValue(productData,ProductModel.class);
			productModel.setPicture(files.getBytes());	
			productRepo.save(productModel);		}	
		catch(Exception err){
			System.out.println("error" + err);			
		}

		 return productModel;

	}
	@Override
	public List<ProductModel> getProductList() {
		return productRepo.findAll();
	}

//	for Deleting Product
	@Modifying
	@Override
	public void deleteProduct(Long id) {
		productRepo.softDeleteById(id);	
	}
}
