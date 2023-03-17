import {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import css from "./style.module.css";
import { filterType } from "../../../../utils/filters";
import * as d3 from "d3";
import { useD3 } from "../../../../hooks/useD3";
import { truncate } from "../../../../utils/util";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import _ from "lodash";

const calculateGraph = (data) => {
  const links = [];
  const obj = new Map();

  // color management
  const clrs = d3.schemeTableau10;
  const color = d3.scaleOrdinal(Array.from(obj.keys()), clrs);
  const sizeScale = d3.scaleSqrt().domain([0, 100]).range([5, 20]);

  const nodes = data.map((item) => ({
    ...item,
    size: 0,
    color: "pink",
  }));

  // linking logic
  nodes.forEach((d, i) => {
    const el = d["journal_id"];
    if (!obj.has(el)) {
      obj.set(el, [d]);
    } else {
      obj.get(el).push(d);
    }
  });

  nodes.forEach((d) => {
    d.size = sizeScale(obj.get(d["journal_id"]).length);
    d.color = color(d.size);
  });

  for (let [key, value] of obj.entries()) {
    for (let i = 1; i < value.length; i++) {
      links.push({
        source: value[0],
        target: value[i],
        id: `${value[0]["research_id"]}-${value[i]["research_id"]}`,
      });
    }
  }
  return { nodes, links };
};

const getRelatedArticles = (article) => {
  const journalId = article["journal_id"];
  const relatedArticles = d3
    .selectAll("g")
    .filter(
      (d) =>
        d["journal_id"] === journalId &&
        d["research_id"] !== article["research_id"]
    );
  const connectedLines = d3
    .selectAll("line")
    .filter(
      (d) =>
        d["source"]["journal_id"] === journalId ||
        d["target"]["journal_id"] === journalId
    );
  return [relatedArticles, connectedLines];
};

const getConnectedLines = (journalId) => {
  return d3
    .selectAll("line")
    .filter(
      (d) =>
        d["source"]["journal_id"] === journalId ||
        d["target"]["journal_id"] === journalId
    );
};

const setMouseover = (node, func) => {
  const debouncedFunc = _.debounce(func, 50); // debounce with 50ms delay

  let articles;
  let connectedLines;

  node.on("mouseover", (e) => {
    const article = d3.select(e.target.parentNode).datum();

    debouncedFunc(article);

    // Cache the selection of articles and connected lines
    [articles, connectedLines] = getRelatedArticles(article);

    d3.selectAll("g").attr("opacity", 0.2);
    d3.selectAll("line").attr("opacity", 0.1);

    articles.attr("opacity", 1);
    connectedLines.attr("opacity", 0.5);

    d3.select(e.target.parentNode)
      .attr("opacity", 1)
      .select("text")
      .classed(css.hideText, false)
      .classed(css.showText, true);
  });
};

const setMouseout = (node) => {
  // const debouncedFunc = _.debounce((e) => {
  //   console.log("mouseout");
  //   d3.selectAll("g").attr("opacity", 1);
  //   d3.selectAll("line").attr("opacity", 0.2);
  //   d3.select(e.target.parentNode)
  //     .select("text")
  //     .classed(css.hideText, true)
  //     .classed(css.showText, false);
  // }, 0); // debounce with 50ms delay

  node.on("mouseout", (e) => {
    d3.selectAll("g").attr("opacity", 1);
    d3.selectAll("line").attr("opacity", 0.2);
    d3.select(e.target.parentNode)
      .select("text")
      .classed(css.hideText, true)
      .classed(css.showText, false);
  });
};

const SVG = ({
  data,
  filterBy,
  width,
  height,
  chosenArticle,
  handleArticle,
  searchArticle,
  handleSearchArticle,
}) => {
  const filteredData = useMemo(
    () => filterType(data, filterBy),
    [data, filterBy]
  );
  const graph = useMemo(() => calculateGraph(filteredData), [filteredData]);

  // to fix bug
  let lastNode = null;
  let clicked = false;
  // const [clicked, setClicked] = useState(false);

  // could add backgroundClick handle NOTE!!!

  const ref = useD3(
    (svg) => {
      const link = svg.selectAll(".link").data(graph.links, (d) => d.id);

      // enter selection
      const linkEnter = link
        .enter()
        .append("line")
        .classed("link", true)
        .attr("stroke", "#aaa")
        .attr("opacity", 0.2);

      const node = svg
        .selectAll("g")
        .data(graph.nodes, (d) => d)
        .join("g")
        .attr("id", (d) => "a" + d.id)
        .attr("cursor", "pointer");

      node
        .append("circle")
        .attr("r", (d) => d.size)
        .attr("fill", (d) => d.color)
        .attr("stroke", (d) => (d?.wos ? "#FFD73B" : "black"))
        .attr("stroke-width", (d) => (d?.wos ? 3 : 1));

      node
        .append("text")
        .attr("text-anchor", "end")
        .attr("dy", ".35em")
        .attr("dx", "-1em")
        .attr("fill", (d) => d.color)
        .style("font-size", "1em")
        .style("user-select", "none")
        .style("font-weight", "bold")
        .classed(css.hideText, true)
        .classed(css.showText, false)
        .text((d) => truncate(d["research_title"], 30));

      setMouseover(node, handleArticle);
      setMouseout(node);

      // mouse event handling
      node.on("click", (e) => {
        const el =
          e.target.nodeName === "g"
            ? d3.select(e.target)
            : d3.select(e.target.parentNode);

        if (!clicked) lastNode = null;
        clicked =
          el.datum()["research_id"] === lastNode?.datum()["research_id"]
            ? false
            : true;

        const article = el.datum();
        const journalId = article["journal_id"];

        handleArticle(article);

        // see this
        d3.selectAll("g").attr("opacity", 0.1);
        d3.selectAll("line").attr("opacity", 0.1);

        d3.selectAll("g")
          .filter((d) => d["journal_id"] === journalId)
          .attr("opacity", 0.5);

        // left here !!!
        (e.target.nodeName === "g"
          ? d3.select(e.target)
          : d3.select(e.target.parentNode)
        )
          .attr("opacity", 1)
          .select("text")
          .classed(css.hideText, false)
          .classed(css.showText, true);

        if (clicked) {
          // remove event listeners
          node.on("mouseover", null);
          node.on("mouseout", null);
          getConnectedLines(journalId).attr("opacity", 0.5);

          // // bug fix (temporary)
          lastNode &&
            lastNode
              .select("text")
              .classed(css.hideText, true)
              .classed(css.showText, false);
        } else {
          setMouseover(node, handleArticle);
          setMouseout(node);
        }
        lastNode = el;
      });

      if (searchArticle) {
        d3.select("#a" + searchArticle.id).dispatch("click");
        // handleSearchArticle(null);
      }

      //simulation
      const simulation = d3
        .forceSimulation(graph.nodes)
        .force(
          "link",
          d3
            .forceLink()
            .id((d) => d["research_id"])
            .links(graph.links)
            .distance(100)
        )
        .force("charge", d3.forceManyBody().strength(-300).distanceMax(30))
        .force(
          "collide",
          d3.forceCollide((d) => d.size)
        )
        .force("center", d3.forceCenter(width / 2, height / 2)) // should be dynamic
        .alpha(0.8)
        .alphaTarget(0)
        .on("tick", () => {
          const calcX = (d) => {
            return (d.x = Math.max(d.size, Math.min(width - d.size, d.x)));
          };
          const calcY = (d) => {
            return (d.y = Math.max(d.size, Math.min(height - d.size, d.y)));
          };
          // update selection
          link
            .merge(linkEnter)
            .attr("x1", (d) => d.source.x)
            .attr("y1", (d) => d.source.y)
            .attr("x2", (d) => d.target.x)
            .attr("y2", (d) => d.target.y);
          node.attr("transform", (d) => `translate(${calcX(d)}, ${calcY(d)})`);
        });

      // exit selection
      link.exit().remove();
    },
    [graph.links, searchArticle]
  );

  return (
    <Box>
      <svg width={width} height={height} ref={ref}></svg>
    </Box>
  );
};

const Graph = ({
  data,
  width,
  height,
  type,
  chosenArticle,
  handleArticle,
  searchArticle,
  handleSearchArticle,
}) => {
  // ene hesgiig ynzlaarai dynamic bolgovol sain
  width = window.innerWidth - 700;
  height = 550;
  // end
  return (
    <Box width="100%">
      <Box>
        <Typography variant="h3">{type}</Typography>
      </Box>
      <Box>
        <SVG
          data={data}
          filterBy={type}
          width={width}
          height={height}
          handleArticle={handleArticle}
          chosenArticle={chosenArticle}
          searchArticle={searchArticle}
          handleSearchArticle={handleSearchArticle}
        />
      </Box>
    </Box>
  );
};

export default Graph;
