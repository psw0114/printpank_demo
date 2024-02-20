package com.printbank.front_app;

import java.sql.Connection;
import java.sql.DriverManager;

import org.junit.Test;

public class dbtest {
	@Test
	public void test() throws Exception{
		Class.forName("org.mariadb.jdbc.Driver");

		Connection con = DriverManager.getConnection("jdbc:mariadb://192.168.1.28:3306/PrintBank","printbank","pb20100@)!))");
		System.out.println(con);
	}
}
