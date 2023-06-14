package bcs.elearning.backend.models;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "groups")
public class Group {
    @Id
    private String id;
    private String name;
    private String coachId;
    private List<String> userIds;
    private Date creationDate; 
    private String trainingId;
    
    public Group() {
        this.userIds = new ArrayList<>();
    }
    public Group(String name) {
        this.name = name;
    }
    public String getCoachId() {
        return coachId;
    }
    
    public void setCoachId(String coachId) {
        this.coachId = coachId;
    }
    
    public Date getCreationDate() {
        return creationDate;
    }
    
    public void setCreationDate(Date creationDate) {
        this.creationDate = creationDate;
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
    
    public List<String> getUserIds() {
        return userIds;
    }
    
    public void setUserIds(List<String> userIds) {
        this.userIds = userIds;
    }
    
    public String getTrainingId() {
        return trainingId;
    }
    
    public void setTrainingId(String trainingId) {
        this.trainingId = trainingId;
    }
}
	
	
    

