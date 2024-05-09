package com.example.demo.model;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.EqualsAndHashCode.Exclude;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
@Table(name = "TransactionHistory_table")
public class TransactionHistoryModel {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long transactionId;
	private Long bytesPoint;
	private String status;
	private String itemName;
	private String userName;
    @Column(columnDefinition = "bytea")
	private byte[] picture;
	    
	private LocalDate date = LocalDate.now();  
	@ManyToOne(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	@JsonIgnore
	@Exclude
	private UserModel user;
	

}
