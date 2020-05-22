import React, { useState } from "react";
import { siteUrl } from "../../config/defaultSeo.json";
import algoliasearch from "algoliasearch/lite";
import { Link } from "gatsby";
import {
  Highlight,
  InstantSearch,
  Configure,
  connectHits,
  connectSearchBox,
} from "react-instantsearch-dom";
import {
  Container,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  Avatar,
  Divider,
  TextField,
} from "@material-ui/core";
import Modal from "./Modal";
import FormAfiliado from "./FormAfiliado";
import SearchIcon from "@material-ui/icons/Search";
let searchClient = algoliasearch("0000", "0000");
try {
  searchClient = algoliasearch(
    process.env.ALGOLIA_APP_ID,
    process.env.ALGOLIA_API_KEY
  );
  if (!process.env.ALGOLIA_APP_ID) {
    console.warning(
      `No se pudo cargar datos de Algolia ${process.env.ALGOLIA_APP_ID}`
    );
  }
  if (!process.env.ALGOLIA_API_KEY) {
    console.warning(
      `No se pudo cargar datos de Algolia ${process.env.ALGOLIA_API_KEY}`
    );
  }
} catch (error) {
  console.error("error al cargar los datos del buscador algolia");
}
const SearchBox = ({ refine, isSearchStalled, onFocus, onBlur }) => {
  return (
    <TextField
      id="test"
      variant="outlined"
      onFocus={onFocus}
      // onBlur={onBlur}
      fullWidth
      label={
        <Box display="flex" justifyContent="center" alignItems="flex-start">
          <SearchIcon></SearchIcon>Buscar
        </Box>
      }
      placeholder="Nombre del titular"
      color="primary"
      type="search"
      onChange={(event) => refine(event.currentTarget.value)}
    ></TextField>
  );
};
const Hits = ({ hits }) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <List style={{ width: "100%" }}>
      {hits.map((hit, i) => {
        return (
          <ListItem
            key={i}
            style={{
              margin: "4px 0",
              border: "1px solid black",
              borderRadius: 4,
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            <Box
              style={{
                padding: "4px 0",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ListItemText
                style={{
                  margin: "0 4px",
                  borderTop: "none",
                  borderLeft: "none",
                  borderBottom: "none",
                  width: "25%",
                  height: "100%",
                }}
              >
                {hit.codigo}
              </ListItemText>

              <ListItemText
                style={{ width: "75%" }}
                primary={<Highlight hit={hit} attribute="clientes" />}
              ></ListItemText>
            </Box>
            <Box>
              <Button
                onClick={() => setOpenModal(true)}
                variant="outlined"
                color="primary"
              >
                Completar información
              </Button>
              <Modal
                title={`${hit.clientes} ${hit.codigo}`}
                open={openModal}
                onClose={() => setOpenModal(false)}
              >
                <FormAfiliado nombre={hit.clientes} codigo={hit.codigo} />
              </Modal>
            </Box>
          </ListItem>
        );
      })}
    </List>
  );
};
const CustomHits = connectHits(Hits);
const CustomSearchBox = connectSearchBox(SearchBox);
const SearchApp = () => {
  const [startSearch, setStartSearch] = useState(false);
  return (
    <Container style={{ marginBottom: 32 }}>
      <InstantSearch searchClient={searchClient} indexName="clientes">
        <CustomSearchBox
          onFocus={() => setStartSearch(true)}
          onBlur={() => setTimeout(() => setStartSearch(false), 100)}
        />
        {startSearch && <CustomHits></CustomHits>}
        <Configure hitsPerPage={5}></Configure>
      </InstantSearch>
    </Container>
  );
};
export default SearchApp;
