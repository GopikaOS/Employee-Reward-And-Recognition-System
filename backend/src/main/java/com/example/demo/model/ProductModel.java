package com.example.demo.model;
import java.util.Date;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
	@Entity
	@Table(name="productData")

	public class ProductModel {
		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		private Long productId;
		@NotNull
		private String productName;
		private String manufacturerName;
		private String bytesPoints;
		private String productCategory;
	    private String size;     
	    private Long inStock;    
	    private String warrantyInfo; 
		private Date expiryDate;
	    private String description;  
	    private String redeemCondition;	
	    @Column(columnDefinition = "bytea")
		private byte[] picture;
	    private boolean deleted = false; 
	    

}
