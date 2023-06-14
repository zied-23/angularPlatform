package bcs.elearning.backend.models;

import java.util.Date;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "coaches")
public class Coach extends User {
    private Date joinDate;
    private String cv;
	public Date getJoinDate() {
		return joinDate;
	}
	public Coach() {
    }

    public Coach(String username, String email, String password,String phone,String fullname) {
        super(username, email, password,phone,fullname);
    }
	public void setJoinDate(Date joinDate) {
		this.joinDate = joinDate;
	}
	public String getCv() {
		return cv;
	}
	public void setCv(String cv) {
		this.cv = cv;
	}
    

    
}
