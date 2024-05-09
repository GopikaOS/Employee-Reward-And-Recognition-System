package com.example.demo.dto;
import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@AllArgsConstructor
@NoArgsConstructor
@Data

public class UserPointDto {

	List<Long> id=new ArrayList<>();	
	Long rewardId;
	
	
}
