package com.example.relationaldataaccess;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

import java.util.*;
import java.sql.*;

@RestController
public class UserController {

    @Autowired
	JdbcTemplate jdbcTemplate;

	@GetMapping("/customer")
	public Customer[] getCustomers(@RequestParam String firstname) {
		String sql = "SELECT * FROM customers WHERE first_name = ?";
		List<Customer> customers = jdbcTemplate.query(sql, new Object[]{firstname}, customerRowMapper());
		return customers.toArray(new Customer[0]);
	}

	private RowMapper<Customer> customerRowMapper() {
		return (rs, rowNum) -> {
			Customer customer = new Customer();
			customer.id = rs.getInt("id");
			customer.firstName =rs.getString("first_name");
			customer.lastName = rs.getString("last_name");
			customer.index = rs.getInt("index");
			return customer;
		};
	}
}