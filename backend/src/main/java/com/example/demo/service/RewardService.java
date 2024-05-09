package com.example.demo.service;

import java.util.List;

import com.example.demo.model.RewardModel;

public interface RewardService {
	
	RewardModel addAwards(RewardModel rewardModel);

	List<RewardModel> getAwardList();

}
