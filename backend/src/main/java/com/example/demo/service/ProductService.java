package com.example.demo.service;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;
import com.example.demo.model.ProductModel;
//
public interface ProductService {

	ProductModel addProduct(String productData, MultipartFile files);
	public List<ProductModel> getProductList();
	void deleteProduct(Long id);
	

}
