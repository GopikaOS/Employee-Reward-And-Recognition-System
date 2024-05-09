package com.example.demo.repo;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.model.ProductModel;
import com.example.demo.model.UserModel;

import jakarta.transaction.Transactional;

public interface ProductRepo extends JpaRepository<ProductModel,Long> {
	
      List<ProductModel> findByProductId(Long productId);
      
      @Modifying
      @Transactional
      @Query(value = "UPDATE product_data SET deleted = true WHERE product_id =:id",nativeQuery = true)
      void softDeleteById(Long id);
}
