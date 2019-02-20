package org.estentor.jhipster.application.domain;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * The Employee entity.
 */
@ApiModel(description = "The Employee entity.")
@Entity
@Table(name = "persons")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "persons")
public class Persons implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    /**
     * The firstname attribute.
     */
    @ApiModelProperty(value = "The firstname attribute.")
    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email")
    private String email;

    @Column(name = "phone_number")
    private String phoneNumber;

    @Column(name = "arrival_date")
    private LocalDate arrivalDate;

    @Column(name = "residency_status")
    private Boolean residencyStatus;

    @Column(name = "document")
    private String document;

    @Column(name = "address")
    private String address;

    @Column(name = "nacionality")
    private String nacionality;

    @OneToOne
    @JoinColumn(unique = true)
    private DocumentType documentType;

    @OneToOne
    @JoinColumn(unique = true)
    private Genre genre;

    @OneToOne
    @JoinColumn(unique = true)
    private Country country;

    @OneToOne
    @JoinColumn(unique = true)
    private Region region;

    @OneToOne
    @JoinColumn(unique = true)
    private Location location;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "persons_habilities",
               joinColumns = @JoinColumn(name = "persons_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "habilities_id", referencedColumnName = "id"))
    private Set<Habilities> habilities = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public Persons firstName(String firstName) {
        this.firstName = firstName;
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public Persons lastName(String lastName) {
        this.lastName = lastName;
        return this;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public Persons email(String email) {
        this.email = email;
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public Persons phoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
        return this;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public LocalDate getArrivalDate() {
        return arrivalDate;
    }

    public Persons arrivalDate(LocalDate arrivalDate) {
        this.arrivalDate = arrivalDate;
        return this;
    }

    public void setArrivalDate(LocalDate arrivalDate) {
        this.arrivalDate = arrivalDate;
    }

    public Boolean isResidencyStatus() {
        return residencyStatus;
    }

    public Persons residencyStatus(Boolean residencyStatus) {
        this.residencyStatus = residencyStatus;
        return this;
    }

    public void setResidencyStatus(Boolean residencyStatus) {
        this.residencyStatus = residencyStatus;
    }

    public String getDocument() {
        return document;
    }

    public Persons document(String document) {
        this.document = document;
        return this;
    }

    public void setDocument(String document) {
        this.document = document;
    }

    public String getAddress() {
        return address;
    }

    public Persons address(String address) {
        this.address = address;
        return this;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getNacionality() {
        return nacionality;
    }

    public Persons nacionality(String nacionality) {
        this.nacionality = nacionality;
        return this;
    }

    public void setNacionality(String nacionality) {
        this.nacionality = nacionality;
    }

    public DocumentType getDocumentType() {
        return documentType;
    }

    public Persons documentType(DocumentType documentType) {
        this.documentType = documentType;
        return this;
    }

    public void setDocumentType(DocumentType documentType) {
        this.documentType = documentType;
    }

    public Genre getGenre() {
        return genre;
    }

    public Persons genre(Genre genre) {
        this.genre = genre;
        return this;
    }

    public void setGenre(Genre genre) {
        this.genre = genre;
    }

    public Country getCountry() {
        return country;
    }

    public Persons country(Country country) {
        this.country = country;
        return this;
    }

    public void setCountry(Country country) {
        this.country = country;
    }

    public Region getRegion() {
        return region;
    }

    public Persons region(Region region) {
        this.region = region;
        return this;
    }

    public void setRegion(Region region) {
        this.region = region;
    }

    public Location getLocation() {
        return location;
    }

    public Persons location(Location location) {
        this.location = location;
        return this;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public Set<Habilities> getHabilities() {
        return habilities;
    }

    public Persons habilities(Set<Habilities> habilities) {
        this.habilities = habilities;
        return this;
    }

    public Persons addHabilities(Habilities habilities) {
        this.habilities.add(habilities);
        habilities.getPersons().add(this);
        return this;
    }

    public Persons removeHabilities(Habilities habilities) {
        this.habilities.remove(habilities);
        habilities.getPersons().remove(this);
        return this;
    }

    public void setHabilities(Set<Habilities> habilities) {
        this.habilities = habilities;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Persons persons = (Persons) o;
        if (persons.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), persons.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Persons{" +
            "id=" + getId() +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", email='" + getEmail() + "'" +
            ", phoneNumber='" + getPhoneNumber() + "'" +
            ", arrivalDate='" + getArrivalDate() + "'" +
            ", residencyStatus='" + isResidencyStatus() + "'" +
            ", document='" + getDocument() + "'" +
            ", address='" + getAddress() + "'" +
            ", nacionality='" + getNacionality() + "'" +
            "}";
    }
}
