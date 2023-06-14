package bcs.elearning.backend.models;

import java.util.HashSet;
import java.util.Set;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;



import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Document(collection = "users")
public class User {
  @Id
  private String id;

  @NotBlank
  @Size(max = 20)
  private String username;

  @NotBlank
  @Size(max = 50)
  @Email
  private String email;
  
  private String image;
  
  @NotBlank
  @Size(max = 50)
  private String phone;
  
  @NotBlank
  @Size(max = 50)
  private String fullname;

  @NotBlank
  @Size(max = 120)
  private String password;
  @DBRef
  private Set<Group> groups = new HashSet<>();
  @DBRef
  private Set<Role> roles = new HashSet<>();
  
  public Set<Group> getGroups() {
	return groups;
}

public void setGroups(Set<Group> groups) {
	this.groups = groups;
}
public void addGroup(Group group) {
    groups.add(group);
}

public void removeGroup(Group group) {
    groups.remove(group);
}



public User() {
  }

  public User(String username, String email, String password,String phone,String fullname) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.fullname = fullname;
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getImage() {
	return image;
}

public void setImage(String image) {
	this.image = image;
}

public String getPhone() {
	return phone;
}

public void setPhone(String phone) {
	this.phone = phone;
}

public String getFullname() {
	return fullname;
}

public void setFullname(String fullname) {
	this.fullname = fullname;
}

public Set<Role> getRoles() {
    return roles;
  }

  public void setRoles(Set<Role> roles) {
    this.roles = roles;
  }
}