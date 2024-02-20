package com.printbank.front_app;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.printbank.front_app.beans.main.MainBean;
import com.printbank.front_app.beans.main.MainBean.News;
import com.printbank.front_app.beans.main.MainBean.Notice;
import com.printbank.front_app.beans.main.MainBean.Recommend;
import com.printbank.front_app.beans.main.db.BannerBean;
import com.printbank.front_app.beans.main.db.NoticeBean;
import com.printbank.front_app.beans.main.db.ReviewBean;
import com.printbank.front_app.services.MainService;

@RestController
@RequestMapping(value = {"main"})
public class MainController {
	@Autowired
	private MainService serv;
//	private CshService cServ;
	
	@GetMapping(value = {"content"})
	public MainBean main(Model model) {
		MainBean.Banner subBanner = new MainBean.Banner();
		MainBean.Recommend recommend = new MainBean.Recommend();
		List<MainBean.News> news = new ArrayList<MainBean.News>();
		MainBean.Notice notice = new MainBean.Notice();
		
		model.addAttribute("main", new MainBean());
		
		serv.selectBanner(model, "banner", "A");
		serv.selectBanner(model, "subBanner", "D");
		serv.selectBanner(model, "noticeBanner", "B");
		serv.selectNotice(model);
		
		product(model);
		
		serv.selectReview(model);
	
		List<MainBean.Recommend.Recommends> rc = new ArrayList<MainBean.Recommend.Recommends>();
		for(int i = 0; i < 9; i++) {
			MainBean.Recommend.Recommends r = new MainBean.Recommend.Recommends();
			
			r.setHref("product");
			r.setSrc("");
			r.setAlt("recommend_item_alt" + i);
			r.setTitle("recommend_item_title_" + i);
			r.setText("recommend_item_text_" + i);
			r.setAmount(100);
			r.setPrice(i*1550);
			
			rc.add(r);
			
		}
		recommend.setRecommend(rc);
		
		
		model.addAttribute("recommend", recommend);
		
		for(int i = 0; i < 2; i++) {
			MainBean.News n = new MainBean.News();
			
			n.setHref("customer");
			n.setSrc("");
			n.setHead(((i % 2) == 0) ? "NEW 이번주 소식" : "Event 이벤트 신청하세요!");
			n.setText(((i % 2) == 0) ? "이번주 신규 소식을 확인해보세요!" : "이벤트 신청하시고 샘플 받아가세요.");
			
			news.add(n);
		}
		
		model.addAttribute("news", news);
		
		notice.setNotice(
			((List<NoticeBean>) model.getAttribute("notice")).stream()
				.map(n -> {
					//
					MainBean.Banner banner = new MainBean.Banner();
					
					//
					
					
					MainBean.Notice.NoticeData nd = new MainBean.Notice.NoticeData();
					
					nd.setCode(n.getCode());
					nd.setDate(n.getDate());
					nd.setTitle(n.getTitle());
					nd.setType(n.getType());
					
					return nd;
				})
				.collect(Collectors.toList())
		);
		notice.setBanner(
				((List<BannerBean>)model.getAttribute("noticeBanner")).stream()
				.map(nb -> {
					MainBean.Banner b = new MainBean.Banner();
					
					b.setAlt(nb.getAlt());
					b.setCode(nb.getCode());
					b.setSrc(nb.getSrc());
					b.setType(nb.getType());
					
					return b;
				})
				.collect(Collectors.toList())
		);
		
						
		subBanner.setAlt(((BannerBean) model.getAttribute("subBanner")).getAlt());
		subBanner.setCode(((BannerBean) model.getAttribute("subBanner")).getCode());
		subBanner.setSrc(((BannerBean) model.getAttribute("subBanner")).getSrc());
		subBanner.setType(((BannerBean) model.getAttribute("subBanner")).getType());
		
		((MainBean) model.getAttribute("main")).setBanner(
			((List<BannerBean>) model.getAttribute("banner")).stream()
				.map(b -> {
					MainBean.Banner bn = new MainBean.Banner();
										
					bn.setAlt(b.getAlt());
					bn.setCode(b.getCode());
					bn.setSrc(b.getSrc());
					bn.setType(b.getType());
					
					return bn;
				})
				.collect(Collectors.toList())
		);
		((MainBean) model.getAttribute("main")).setNotice(notice);
		((MainBean) model.getAttribute("main")).setProduct((MainBean.Product) model.getAttribute("product"));
		
		((MainBean) model.getAttribute("main")).setReview(
			((List<ReviewBean>) model.getAttribute("review")).stream()
				.map(r -> {
					MainBean.Review rv = new MainBean.Review();
					
					rv.setAlt(r.getAlt());
					rv.setAmount(r.getAmount());
					rv.setPrCode(r.getPrCode());
					rv.setPrDesc(r.getPrDesc());
					rv.setPrice(r.getPrice());
					rv.setPrName(r.getPrName());
					rv.setReviewAlt(r.getReviewAlt());
					rv.setReviewSrc(r.getReviewSrc());
					rv.setReviewText(r.getReviewText());
					rv.setSrc(r.getSrc());
					rv.setStar(r.getStar());
					rv.setUserName(r.getUserName());
					
					return rv;
				})
				.collect(Collectors.toList())
		);
		((MainBean) model.getAttribute("main")).setRecommend((MainBean.Recommend)model.getAttribute("recommend"));	
		((MainBean) model.getAttribute("main")).setNews((List<MainBean.News>) model.getAttribute("news"));
		((MainBean) model.getAttribute("main")).setSubBanner(subBanner);
		
		
		
//		MainBean mainBean = new MainBean();
		
//		cServ.MainBanner(model);
//		mainBean.setBannerBean((BannerBean)model.getAttribute("Data"));
//		
//		cServ.NoticeBanner(model);
//		mainBean.setNoticeBean((NoticeBean)model.getAttribute("Data"));
//		
//		
//		cServ.MainReview(model);
//		mainBean.setReviewBean((ReviewBean)model.getAttribute("Data"));
//		
//		
//		RecommendBean recommend = new RecommendBean();
//		
//		ArrayList<RecommendBean.RecItemsBean> reclist = new ArrayList<RecommendBean.RecItemsBean>();
//		
//		for(int i = 1; i < 10; i++) {
//			RecommendBean.RecItemsBean recitem = new RecommendBean.RecItemsBean();
//			
//			recitem.setHref("product");
//			recitem.setSrc("");
//			recitem.setAlt("recommend_item_alt" + i);
//			recitem.setTitle("recommend_item_title_" + i);
//			recitem.setText("recommend_item_text_" + i);
//			recitem.setAmount(100);
//			recitem.setPrice(i*1550);
//			
//			reclist.add(recitem);
//		}
//		
//		recommend.setSide(false);
//		recommend.setItem(reclist);
//		
//		mainBean.setRecommend(recommend);
//		
//	
//
//		NewsBean news = new NewsBean();
//		
//		ArrayList<NewsBean.NewsItemBean> newslist = new ArrayList<NewsBean.NewsItemBean>();
//		
//		for(int i = 1; i < 3; i++) {
//			NewsBean.NewsItemBean newsitem = new NewsBean.NewsItemBean();
//			
//			newsitem.setHref("customer");
//			newsitem.setSrc("");
//			newsitem.setHead(i%2 == 0 ? "NEW 이번주 소식" : "Event 이벤트 신청하세요!");
//			newsitem.setText(i%2 == 0 ? "이번주 신규 소식을 확인해보세요!" : "이벤트 신청하시고 샘플 받아가세요.");
//			
//			newslist.add(newsitem);
//		}
//		
//		news.setNews(newslist);		
//		mainBean.setNews(news);
//		
//		cServ.SubBanner(model);
//		mainBean.setSubBanner((SubBannerBean)model.getAttribute("Data"));	
		
		
		
		return (MainBean) model.getAttribute("main");
	}
	
	
//	@GetMapping(value = {"banner"})
//	public BannerBean banner(Model model) {
//		cServ.MainBanner(model);
//		
//		return (BannerBean)model.getAttribute("Data");
//	}
//	
//	@GetMapping(value = {"notice"})
//	public NoticeBean notice(Model model) {
//		cServ.NoticeBanner(model);
//				
//		return (NoticeBean)model.getAttribute("Data");
//	}
	
	@GetMapping(value = {"product"})
	public MainBean.Product product(Model model) {
		List<MainBean.Product.Products> prodcuts = new ArrayList<MainBean.Product.Products>();
		
		model.addAttribute("product", new MainBean.Product());
		
		serv.selectBanner(model, "productBanner", "B");
		
		((MainBean.Product) model.getAttribute("product")).setSubBanner(
			((List<BannerBean>) model.getAttribute("productBanner")).stream()
				.map(sb -> {
					MainBean.Banner banner = new MainBean.Banner();
					
					banner.setAlt(sb.getAlt());
					banner.setCode(sb.getCode());
					banner.setSrc(sb.getSrc());
					banner.setType(sb.getType());
					
					return banner;
				})
				.collect(Collectors.toList())
		);
		
		for (int i = 0; i < 2; i++) {
			MainBean.Product.Products p = new MainBean.Product.Products();
			List<MainBean.Product.ProductData> pl = new ArrayList<MainBean.Product.ProductData>();
			
			p.setTitle((i == 0) ? "추천상품" : "신상품");
			
			for (int j = 0; j < 3; j++) {
				MainBean.Product.ProductData pd = new MainBean.Product.ProductData();
				
				pd.setAmount(100 * i);
				pd.setPrice(3000 * i);
				pd.setSrc("");
				pd.setText("이런저런 설명" + i);
				pd.setTitle(((i == 0) ? "고품격 명함" : "신상 명함") + i);
				pd.setAlt("product_img_" + i);
				
				pl.add(pd);
			}
			
			p.setData(pl);
			
			prodcuts.add(p);
		}
		
		((MainBean.Product)model.getAttribute("product")).setProduct(prodcuts);
		
//		ProductBean.ProductsBean recommend = new ProductBean.ProductsBean();
//		ProductBean.ProductsBean news = new ProductBean.ProductsBean();
//		ArrayList<ProductBean.ProductsBean> productarr = new ArrayList<ProductBean.ProductsBean>();
//		ArrayList<ProductBean.ProductDataBean> recomarr = new ArrayList<ProductBean.ProductDataBean>();
//		ArrayList<ProductBean.ProductDataBean> newsarr = new ArrayList<ProductBean.ProductDataBean>();
//		ArrayList<ProductBean.SubBannerBean> subarr = new ArrayList<ProductBean.SubBannerBean>();
		
//		
//		recommend.setTitle("추천상품");
//
//		for (int i = 1; i < 4; i++) {
//			ProductBean.ProductDataBean pdb = new ProductBean.ProductDataBean();
//			pdb.setAmount(100 * i);
//			pdb.setPrice(3000 * i);
//			pdb.setSrc("");
//			pdb.setText("이런저런 설명" + i);
//			pdb.setTitle("고품격 명함" + i);
//			pdb.setAlt("product_img_" + i);
//			recomarr.add(pdb);
//		}
//
//		recommend.setData(recomarr);
//		
//		news.setTitle("신상품");
//
//		for (int i = 1; i < 4; i++) {
//			ProductBean.ProductDataBean pdb = new ProductBean.ProductDataBean();
//			pdb.setAmount(100 * i);
//			pdb.setPrice(3000 * i);
//			pdb.setSrc("");
//			pdb.setText("이런저런 설명" + i);
//			pdb.setTitle("신상명함 명함" + i);
//			pdb.setAlt("product_img_" + i);
//			newsarr.add(pdb);
//		}
//
//		news.setData(newsarr);
//		productarr.add(recommend);
//		productarr.add(news);
//		product.setProduct(productarr);
//		product.setSubBanner(subarr);
		
		return (MainBean.Product) model.getAttribute("product");
	}
	
//	@GetMapping(value = {"review"})
//	public ReviewBean review(Model model) {
//		cServ.MainReview(model);
//		
//		return (ReviewBean)model.getAttribute("Data");
//	}
}
