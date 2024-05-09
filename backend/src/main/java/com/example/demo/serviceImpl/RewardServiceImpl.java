package com.example.demo.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.model.RewardModel;
import com.example.demo.repo.RewardRepo;
import com.example.demo.service.RewardService;

@Service
public class RewardServiceImpl implements RewardService {

	@Autowired
	public RewardRepo rewardRepo;

	@Override
	public RewardModel addAwards(RewardModel rewardModel) {
		return rewardRepo.save(rewardModel);
	}

	@Override
	public List<RewardModel> getAwardList() {
		return rewardRepo.findAll();
	}
}
