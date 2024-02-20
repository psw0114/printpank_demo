package com.printbank.front_app.common;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionException;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

@Service("SimpleTxManager")
@Scope("prototype")
public class SimpleTransactionManager extends DefaultTransactionDefinition {
	private static final long serialVersionUID = 1L;
	
	@Autowired(required = false)
	@Qualifier("printbankTransaction")
	private PlatformTransactionManager transactionManager;
	private TransactionStatus txStatus;
	
	/* transactionManager 현재 클래스를 전달함으로써 Transaction을 시작 */
	public void tranStart() throws TransactionException {
		this.txStatus = transactionManager.getTransaction(this);
	}
	
	public void tranEnd() throws TransactionException {
		this.rollback();
	}
	
	public void commit() throws TransactionException {
		if(!this.txStatus.isCompleted()) this.transactionManager.commit(this.txStatus);
	}
	
	public void rollback() throws TransactionException {
		if(!this.txStatus.isCompleted()) this.transactionManager.rollback(this.txStatus);
	}
		
	public void setTransactionConf(boolean isReadOnly) {
		this.setPropagationBehavior(PROPAGATION_REQUIRED);
		this.setIsolationLevel(ISOLATION_READ_COMMITTED);
		this.setReadOnly(isReadOnly);
	}
	
}
