package bcs.elearning.backend.models;

import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;



@Document(collection = "students")
public class Student extends User {
	public enum ProductStatus {
	    PENDING,
	    UNPAID,
	    PAID
	  }
	@DBRef
    private String productId;

    private ProductStatus  status;
    public Student() {
   
    }
    public Student(String username, String email, String password,String phone,String fullname) {
        super(username, email, password,phone,fullname);
    }
	public ProductStatus  getStatus() {
		return status;
	}
	public void setStatus(ProductStatus status) {
		this.status = status;
	}
	public String getProductId() {
		return productId;
	}
	public void setProductId(String productId) {
		this.productId = productId;
	}
	

}
