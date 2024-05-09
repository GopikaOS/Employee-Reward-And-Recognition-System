package com.example.demo.dto;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductPurchaseDto {
	private Long userId;
	private List<ProductDetails>productsDetails=new ArrayList<>();
}
