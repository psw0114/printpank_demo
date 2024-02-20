package com.printbank.front_app.common;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Service;

@Service("TranAssistant")
public class TransactionAssistant {
	@Autowired
	protected SqlSessionTemplate printbankSession;
	@Autowired
	private ApplicationContext applicationContext;
	
	protected SimpleTransactionManager getTransaction(boolean isReadOnly) {
		SimpleTransactionManager SimpleTxManager = applicationContext.getBean(SimpleTransactionManager.class);
		SimpleTxManager.setTransactionConf(isReadOnly);
		return SimpleTxManager;
	}
	
	/* boolean 변환 */
	protected boolean convertToBoolean(int value) {
		return (value >= 1)? true: false;
	}
	
}
