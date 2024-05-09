package com.example.demo.repo;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.model.TransactionHistoryModel;
import com.example.demo.model.UserModel;



public interface TransactionHistoryRepo extends JpaRepository<TransactionHistoryModel,Long >{
	@Query(value = "SELECT * FROM user_data WHERE role = 'Employee'", nativeQuery = true)
    List<UserModel> findByRoleEmployee();
   
//	@Query(value = "select * from transaction_history_table where user_id= 'id'", nativeQuery = true)
//	List<TransactionHistoryModel> findByStatusAndUserId(String status, int userId);
    List<TransactionHistoryModel> findByUserId(int id );
}
