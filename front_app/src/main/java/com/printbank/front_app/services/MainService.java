package com.printbank.front_app.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.printbank.front_app.common.SimpleTransactionManager;
import com.printbank.front_app.common.TransactionAssistant;

@Service
public class MainService extends TransactionAssistant {
	@Autowired
	private SimpleTransactionManager tranManager;

	public void selectBanner(Model model, String attributeName, String type) {
		try {
			this.tranManager = this.getTransaction(true);
			this.tranManager.tranStart();

			switch (type) {
			case "D":
				model.addAttribute(attributeName, printbankSession.selectOne("mainSelectBanner", type));
				break;
			default:
				model.addAttribute(attributeName, printbankSession.selectList("mainSelectBanner", type));
				break;
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			this.tranManager.tranEnd();
		}
	}

	public void selectNotice(Model model) {
		try {
			this.tranManager = this.getTransaction(true);
			this.tranManager.tranStart();

			model.addAttribute("notice", printbankSession.selectList("mainSelectNotice"));
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			this.tranManager.tranEnd();
		}
	}

	public void selectReview(Model model) {
		try {
			this.tranManager = this.getTransaction(true);
			this.tranManager.tranStart();

			model.addAttribute("review", printbankSession.selectList("mainSelectReview"));
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			this.tranManager.tranEnd();
		}
	}
}
