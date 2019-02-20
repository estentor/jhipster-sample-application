package org.estentor.jhipster.application.web.rest;
import org.estentor.jhipster.application.domain.Persons;
import org.estentor.jhipster.application.repository.PersonsRepository;
import org.estentor.jhipster.application.repository.search.PersonsSearchRepository;
import org.estentor.jhipster.application.web.rest.errors.BadRequestAlertException;
import org.estentor.jhipster.application.web.rest.util.HeaderUtil;
import org.estentor.jhipster.application.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing Persons.
 */
@RestController
@RequestMapping("/api")
public class PersonsResource {

    private final Logger log = LoggerFactory.getLogger(PersonsResource.class);

    private static final String ENTITY_NAME = "persons";

    private final PersonsRepository personsRepository;

    private final PersonsSearchRepository personsSearchRepository;

    public PersonsResource(PersonsRepository personsRepository, PersonsSearchRepository personsSearchRepository) {
        this.personsRepository = personsRepository;
        this.personsSearchRepository = personsSearchRepository;
    }

    /**
     * POST  /persons : Create a new persons.
     *
     * @param persons the persons to create
     * @return the ResponseEntity with status 201 (Created) and with body the new persons, or with status 400 (Bad Request) if the persons has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/persons")
    public ResponseEntity<Persons> createPersons(@RequestBody Persons persons) throws URISyntaxException {
        log.debug("REST request to save Persons : {}", persons);
        if (persons.getId() != null) {
            throw new BadRequestAlertException("A new persons cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Persons result = personsRepository.save(persons);
        personsSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/persons/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /persons : Updates an existing persons.
     *
     * @param persons the persons to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated persons,
     * or with status 400 (Bad Request) if the persons is not valid,
     * or with status 500 (Internal Server Error) if the persons couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/persons")
    public ResponseEntity<Persons> updatePersons(@RequestBody Persons persons) throws URISyntaxException {
        log.debug("REST request to update Persons : {}", persons);
        if (persons.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Persons result = personsRepository.save(persons);
        personsSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, persons.getId().toString()))
            .body(result);
    }

    /**
     * GET  /persons : get all the persons.
     *
     * @param pageable the pagination information
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many)
     * @return the ResponseEntity with status 200 (OK) and the list of persons in body
     */
    @GetMapping("/persons")
    public ResponseEntity<List<Persons>> getAllPersons(Pageable pageable, @RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get a page of Persons");
        Page<Persons> page;
        if (eagerload) {
            page = personsRepository.findAllWithEagerRelationships(pageable);
        } else {
            page = personsRepository.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, String.format("/api/persons?eagerload=%b", eagerload));
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /persons/:id : get the "id" persons.
     *
     * @param id the id of the persons to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the persons, or with status 404 (Not Found)
     */
    @GetMapping("/persons/{id}")
    public ResponseEntity<Persons> getPersons(@PathVariable Long id) {
        log.debug("REST request to get Persons : {}", id);
        Optional<Persons> persons = personsRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(persons);
    }

    /**
     * DELETE  /persons/:id : delete the "id" persons.
     *
     * @param id the id of the persons to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/persons/{id}")
    public ResponseEntity<Void> deletePersons(@PathVariable Long id) {
        log.debug("REST request to delete Persons : {}", id);
        personsRepository.deleteById(id);
        personsSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/persons?query=:query : search for the persons corresponding
     * to the query.
     *
     * @param query the query of the persons search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/persons")
    public ResponseEntity<List<Persons>> searchPersons(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Persons for query {}", query);
        Page<Persons> page = personsSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/persons");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

}
