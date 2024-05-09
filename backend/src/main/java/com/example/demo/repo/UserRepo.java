package com.example.demo.repo;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.model.UserModel;
public interface UserRepo extends JpaRepository<UserModel,Long>{ 
	UserModel findByEmail(String email);
    @Query(value="SELECT * FROM user_data WHERE total_bytes_points = (SELECT MAX(total_bytes_points) FROM user_data WHERE deleted = false) AND deleted = false;",nativeQuery = true)
	List<UserModel> findTopPerformer();
	
	@Query(value = "SELECT * FROM user_data WHERE role = 'Employee'", nativeQuery = true)
    List<UserModel> findByRoleEmployee();
	
//	for soft deleting users
	List<UserModel> findAllUsersByDeletedFalse();
	

	
//     for finding number of active users
	@Query(value="SELECT COUNT(*) AS rowCount FROM user_data WHERE deleted = false;", nativeQuery = true)
	long getActiveUserCount();
	
	@Query(value="SELECT COUNT(*) AS rowCount FROM user_data WHERE deleted = false AND role = 'Employee';", nativeQuery = true)
	long getActiveEmployeesCount();
	
	@Query(value="SELECT COUNT(*) AS rowCount FROM user_data WHERE deleted = false AND role = 'Admin';", nativeQuery = true)
	long getAdminCount();
	
}

