package com.printbank.front_app.services;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.sql.DataSource;

import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.printbank.front_app.beans.utils.HeaderBean;
import com.printbank.front_app.common.SimpleTransactionManager;
import com.printbank.front_app.common.TransactionAssistant;

import lombok.Setter;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class ServiceTest extends TransactionAssistant {

	@Autowired
	private DataSource dataSource;

	@Autowired
	private SimpleTransactionManager tranManager;

	private SqlSessionFactory sessionFactory;

	public void getHeaderData(Model model) {
		try {
			this.tranManager = this.getTransaction(true);
			this.tranManager.tranStart();

			model.addAttribute("header", printbankSession.selectList("header"));
	

		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			this.tranManager.tranEnd();
		}
	}
}
