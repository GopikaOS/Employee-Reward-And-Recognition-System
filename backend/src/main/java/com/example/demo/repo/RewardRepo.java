package com.example.demo.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.model.RewardModel;

public interface RewardRepo extends JpaRepository<RewardModel,Long>{
	RewardModel findByAwardName(String awardName);

	@SuppressWarnings("unchecked")
	RewardModel save(RewardModel rewardModel);
}

