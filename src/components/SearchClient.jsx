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
  Avatar,
  Divider,
  TextField,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
let searchClient = algoliasearch("0000", "0000");
try {
  searchClient = algoliasearch(
    process.env.ALGOLIA_APP_ID,
    process.env.ALGOLIA_API_KEY
  );
} catch (error) {
  console.error("error al cargar los datos del buscador algolia");
}
const SearchBox = ({ refine, isSearchStalled, onFocus, onBlur }) => {
  return (
    <TextField
      id="test"
      variant="outlined"
      onFocus={onFocus}
      onBlur={onBlur}
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
  return (
    <List style={{ width: "100%" }}>
      {hits.map((hit, i) => {
        return (
          <ListItem
            key={i}
            style={{
              margin: "4px 0",
              padding: "4px 0",
              border: "1px solid black",
              borderRadius: 4,
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
