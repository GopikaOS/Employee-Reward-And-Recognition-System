package com.example.demo.exception;


import org.postgresql.util.PSQLException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice

public class ErrorHandling {          
	 @ExceptionHandler(PSQLException.class)
	    public ResponseEntity<String> handlePSQLException(PSQLException e) {
		 String detailMessage = e.getMessage();
		 System.out.println();
		   if (detailMessage.contains("duplicate key value violates unique constraint")) {
	            int startIndex = detailMessage.indexOf("(")+1;
	            int endIndex = detailMessage.indexOf(")");
	            String duplicateKeyInfo = detailMessage.substring(startIndex, endIndex );
	            duplicateKeyInfo = duplicateKeyInfo + " already exists";
	            return ResponseEntity.badRequest().body(duplicateKeyInfo);
	        }
	         else {
		        return ResponseEntity.badRequest().body("something went wrong");
	        }
	       
	    }
	
    
	} 