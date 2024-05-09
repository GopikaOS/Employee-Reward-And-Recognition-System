package com.example.demo.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode.Exclude;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Data

	@Entity
	@Table(name="reward_data")
	public class RewardModel {
		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		private Long awardId;
		@Column(unique = true)
		@NotNull
		private String awardName;
		@Column(unique = true)
		private Long bytesPoints;
		
		@ManyToMany(fetch = FetchType.EAGER, cascade =CascadeType.ALL)
	    @JoinTable(name="USER_Reward", 
	            joinColumns = {
	                    @JoinColumn (name="award_ID")},
	            inverseJoinColumns = {
	                    @JoinColumn(name="user_ID")}
	    )
		@JsonIgnore
		@Exclude
		private List<UserModel>listOfUsers = new ArrayList<>();

}
