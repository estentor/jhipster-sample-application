package org.estentor.jhipster.application.web.rest;
import org.estentor.jhipster.application.domain.Habilities;
import org.estentor.jhipster.application.repository.HabilitiesRepository;
import org.estentor.jhipster.application.repository.search.HabilitiesSearchRepository;
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
 * REST controller for managing Habilities.
 */
@RestController
@RequestMapping("/api")
public class HabilitiesResource {

    private final Logger log = LoggerFactory.getLogger(HabilitiesResource.class);

    private static final String ENTITY_NAME = "habilities";

    private final HabilitiesRepository habilitiesRepository;

    private final HabilitiesSearchRepository habilitiesSearchRepository;

    public HabilitiesResource(HabilitiesRepository habilitiesRepository, HabilitiesSearchRepository habilitiesSearchRepository) {
        this.habilitiesRepository = habilitiesRepository;
        this.habilitiesSearchRepository = habilitiesSearchRepository;
    }

    /**
     * POST  /habilities : Create a new habilities.
     *
     * @param habilities the habilities to create
     * @return the ResponseEntity with status 201 (Created) and with body the new habilities, or with status 400 (Bad Request) if the habilities has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/habilities")
    public ResponseEntity<Habilities> createHabilities(@RequestBody Habilities habilities) throws URISyntaxException {
        log.debug("REST request to save Habilities : {}", habilities);
        if (habilities.getId() != null) {
            throw new BadRequestAlertException("A new habilities cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Habilities result = habilitiesRepository.save(habilities);
        habilitiesSearchRepository.save(result);
        return ResponseEntity.created(new URI("/api/habilities/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /habilities : Updates an existing habilities.
     *
     * @param habilities the habilities to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated habilities,
     * or with status 400 (Bad Request) if the habilities is not valid,
     * or with status 500 (Internal Server Error) if the habilities couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/habilities")
    public ResponseEntity<Habilities> updateHabilities(@RequestBody Habilities habilities) throws URISyntaxException {
        log.debug("REST request to update Habilities : {}", habilities);
        if (habilities.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Habilities result = habilitiesRepository.save(habilities);
        habilitiesSearchRepository.save(result);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, habilities.getId().toString()))
            .body(result);
    }

    /**
     * GET  /habilities : get all the habilities.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of habilities in body
     */
    @GetMapping("/habilities")
    public ResponseEntity<List<Habilities>> getAllHabilities(Pageable pageable) {
        log.debug("REST request to get a page of Habilities");
        Page<Habilities> page = habilitiesRepository.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/habilities");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /habilities/:id : get the "id" habilities.
     *
     * @param id the id of the habilities to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the habilities, or with status 404 (Not Found)
     */
    @GetMapping("/habilities/{id}")
    public ResponseEntity<Habilities> getHabilities(@PathVariable Long id) {
        log.debug("REST request to get Habilities : {}", id);
        Optional<Habilities> habilities = habilitiesRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(habilities);
    }

    /**
     * DELETE  /habilities/:id : delete the "id" habilities.
     *
     * @param id the id of the habilities to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/habilities/{id}")
    public ResponseEntity<Void> deleteHabilities(@PathVariable Long id) {
        log.debug("REST request to delete Habilities : {}", id);
        habilitiesRepository.deleteById(id);
        habilitiesSearchRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/habilities?query=:query : search for the habilities corresponding
     * to the query.
     *
     * @param query the query of the habilities search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/habilities")
    public ResponseEntity<List<Habilities>> searchHabilities(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of Habilities for query {}", query);
        Page<Habilities> page = habilitiesSearchRepository.search(queryStringQuery(query), pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/habilities");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

}
