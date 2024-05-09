package com.example.demo.model;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PurchaseModel {
	private Long productId;
	private String productName;
	private String bytesPoints;
	private Long userId;
	private String userName;
	private LocalDate date;


}
