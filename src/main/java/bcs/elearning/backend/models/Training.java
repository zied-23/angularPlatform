package bcs.elearning.backend.models;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "trainings")
public class Training {
    @Id
    private String id;
    //private String formName;
    private String name;
    private String description;
    private String trainingCh;
    private String numberOfEx;
    private Date createDate;
    
	public Date getCreateDate() {
		return createDate;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getTrainingCh() {
		return trainingCh;
	}
	public void setTrainingCh(String traningCh) {
		this.trainingCh = traningCh;
	}
	public String getNumberOfEx() {
		return numberOfEx;
	}
	public void setNumberOfEx(String numberOfEx) {
		this.numberOfEx = numberOfEx;
	}
	
    
   
}
