import React, { useState, useEffect } from "react";
import { siteUrl } from "../../config/defaultSeo.json";
import algoliasearch from "algoliasearch/lite";
import { Link } from "gatsby";
import {
  Highlight,
  InstantSearch,
  RefinementList,
  Configure,
  connectHits,
  connectSearchBox
} from "react-instantsearch-dom";
import {
  Container,
  Typography,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Divider,
  TextField
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import CardPerson from "./LandingObituario/CardPerson";
// const searchClient = algoliasearch(
//   "4JFWWG6LZM",
//   "78142e94c2de4b3d959e0498f03395c3"
// );
let searchClient = algoliasearch("0000", "0000");
try {
  searchClient = algoliasearch(
    process.env.ALGOLIA_APP_ID,
    process.env.ALGOLIA_API_KEY
  );
} catch (error) {}
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
      placeholder="Busque sus obituarios"
      color="primary"
      type="search"
      onChange={event => refine(event.currentTarget.value)}
    ></TextField>
  );
};
const Hits = ({ hits }) => {
  return (
    <List>
      {hits.map(hit => {
        return (
          <Link key={hit.objectID} to={hit.url.replace(siteUrl, "")}>
            <ListItem>
              <ListItemAvatar>
                <Avatar src={hit.foto}></Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={<Highlight hit={hit} attribute="nombre" />}
              ></ListItemText>
            </ListItem>
            <Divider variant="inset" component="li" />
          </Link>
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
      <InstantSearch searchClient={searchClient} indexName="obituarios">
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
