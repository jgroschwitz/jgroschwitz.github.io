
let currentTransform = d3.zoomIdentity;

let highlightedPoint = null;
let selectedPoint = null;
let detailMode = false;

const width = window.innerWidth;
const height = window.innerHeight;
const circleR = 3;
const highlightR = 5;
let zoom;
let circles;
let quadtree;

const PointSelectionState = {
  None: 0,
  Hover: 1,
  Selected: 2,
};


const svg = d3.select("#plot")
    .attr("width", width)
    .attr("height", height);

const g = svg.append("g");

const tooltip = d3.select("#tooltip");
const tooltipImage = d3.select("#tooltip-image");
const tooltipLabel = d3.select("#tooltip-label");

// ------------------------------------------------------------------
// Load CSV
// ------------------------------------------------------------------

d3.csv("image_embeddings_2d.csv").then(data => {

    // Convert coordinates to numbers
    data.forEach(d => {
        d.x = +d.x;
        d.y = +d.y;
    });

    // ------------------------------------------------------------------
    // Scales
    // ------------------------------------------------------------------

    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.x))
        .range([50, width - 50]);

    const yScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.y))
        .range([height - 50, 50]);

    // ------------------------------------------------------------------
    // Draw points
    // ------------------------------------------------------------------

    g.selectAll("circle")
    // ------------------------------------------------------------------
    // Draw points
    // ------------------------------------------------------------------

    const points = data.map(d => ({
        ...d,
        screenX: xScale(d.x),
        screenY: yScale(d.y)
    }));

    circles = g.selectAll("circle")
        .data(points)
        .enter()
        .append("circle")
        .attr("class", "point")
        .attr("cx", d => d.screenX)
        .attr("cy", d => d.screenY)
        .attr("r", circleR)
        .each(function(d) {
            d.element = this;
        });


    // ------------------------------------------------------------------
    // Build quadtree for nearest-neighbor lookup
    // ------------------------------------------------------------------

    quadtree = d3.quadtree()
        .x(d => d.screenX)
        .y(d => d.screenY)
        .addAll(points);


});

function stylePointForSelection(point, selectionState) {

    if (!point) {
        return;
    }
    let color;
    let opacity;
    let r;

    if (selectionState == PointSelectionState.None) {
        color = "white"
        opacity = 0.3
        r = circleR
        if (selectedPoint) {
            d3.select(selectedPoint.element).raise();
        }
    } else if (selectionState == PointSelectionState.Hover) {
        color = "orange"
        opacity = 1.0
        r = highlightR
        d3.select(point.element).raise();
    } else if (selectionState == PointSelectionState.Selected) {
        color = "red"
        opacity = 1.0
        r = highlightR
        d3.select(point.element).raise();
    }
    d3.select(point.element)
        .style("fill", color)
        .style("opacity", opacity)
        .attr("r", r / currentTransform.k)
}


// ------------------------------------------------------------------
// Hover interaction
// ------------------------------------------------------------------

svg.on("mousemove", function(event) {

    const [mouseX, mouseY] = d3.pointer(event);

    // Convert screen coords back into plot coords
    const mx = currentTransform.invertX(mouseX);
    const my = currentTransform.invertY(mouseY);

    // Find nearest point within radius
    const nearest = quadtree.find(mx, my, 30 / currentTransform.k);

    if (nearest) {

        if (highlightedPoint !== nearest && (!selectedPoint || nearest !== selectedPoint)) {
            if (highlightedPoint !== selectedPoint) {
                stylePointForSelection(highlightedPoint, PointSelectionState.None)
            }
            highlightedPoint = nearest;
            stylePointForSelection(highlightedPoint, PointSelectionState.Hover)

            showTooltip(nearest, event);
        }

    } else {
        if (highlightedPoint !== selectedPoint) {
            stylePointForSelection(highlightedPoint, PointSelectionState.None)
        }
        highlightedPoint = null;

        tooltip.style("display", "none");
    }
});

function showTooltip(nearest, event) {
    const thumbPath = nearest.path.replace(
        "images_224",
        "images_64"
    );

    tooltip
        .style("display", "block")

    // Tooltip size estimate
    const tooltipWidth = 160;
    const tooltipHeight = 180;
    const margin = 20;

    let left = event.pageX + 15;
    let top = event.pageY + 15;

    // Prevent going off right edge
    if (left + tooltipWidth > window.innerWidth - margin) {
        left = event.pageX - tooltipWidth - 15;
    }

    // Prevent going off bottom edge
    if (top + tooltipHeight > window.innerHeight - margin) {
        top = event.pageY - tooltipHeight - 15;
    }

    // Prevent going off left edge
    if (left < margin) {
        left = margin;
    }

    // Prevent going off top edge
    if (top < margin) {
        top = margin;
    }

    tooltip
        .style("left", left + "px")
        .style("top", top + "px");

    tooltipImage
        .attr("src", thumbPath);

    tooltipLabel
        .text(nearest.path.substring("images_224/".length, nearest.path.length - ".jpg".length));
}

// Hide tooltip when leaving SVG
svg.on("mouseleave", function() {
    tooltip.style("display", "none");
});

// ------------------------------------------------------------------
// Zoom / Pan
// ------------------------------------------------------------------

zoom = d3.zoom()
    .scaleExtent([0.5, 20])
    .on("zoom", (event) => {

        currentTransform = event.transform;

        g.attr("transform", currentTransform);

        g.selectAll("circle")
            .attr("r", circleR / currentTransform.k);

        if (selectedPoint) {
            d3.select(selectedPoint.element)
                .attr("r", highlightR / currentTransform.k);
        }


        if (highlightedPoint){
            d3.select(highlightedPoint.element)
                .attr("r", highlightR / currentTransform.k);
        }

//        g.selectAll("circle")
//            .attr("r", d =>
//                d === selectedPoint ?
//                    highlightR / currentTransform.k :
//                    circleR / currentTransform.k);
    });

svg.call(zoom);


svg.on("click", function() {

    if (!highlightedPoint) {
        return;
    }

    if (selectedPoint) {
        stylePointForSelection(selectedPoint, PointSelectionState.None)
    }
    selectedPoint = highlightedPoint;
    stylePointForSelection(selectedPoint, PointSelectionState.Selected)


    // --------------------------------------------------------------
    // Large image
    // --------------------------------------------------------------

    const largeImagePath = "https://eol.jsc.nasa.gov/DatabaseImages/ESC/small/ART002/"
        + highlightedPoint.path.substring("images_224/".length, highlightedPoint.path.length);

    d3.select("#detail-image")
        .attr("src", largeImagePath);

    // --------------------------------------------------------------
    // NASA link
    // --------------------------------------------------------------

    const roll = highlightedPoint.path.substring("images_224/ART002-".length, highlightedPoint.path.lastIndexOf("-"))
    const frame = highlightedPoint.path.substring("images_224/ART002-".length + roll.length + 1, highlightedPoint.path.lastIndexOf("."))
    const nasaURL ="https://eol.jsc.nasa.gov/SearchPhotos/photo.pl?mission=ART002&roll=" + roll + "&frame=" + frame

    d3.select("#detail-link")
        .attr("href", nasaURL);

    if (!detailMode) {
        activateDetailMode()
    }


});

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        detailMode = false;
//        stylePointForSelection(selectedPoint, PointSelectionState.None)
//
//        selectedPoint = null;

        d3.select("#detail-panel")
            .style("display", "none");

        svg
            .style("top", "0")
            .style("height", "100vh");

        // Create updated transform
        const newTransform = d3.zoomIdentity
            .translate(
                currentTransform.x,
                currentTransform.y + window.innerHeight * 0.33
            )
            .scale(currentTransform.k);

        // Animate zoom transform
        svg.transition()
            .duration(500)
            .call(
                zoom.transform,
                newTransform
            );
    } else if (event.code === "Space") {
        if (selectedPoint) {
            activateDetailMode();
        }
    }

});

function activateDetailMode() {
    detailMode = true;
    // --------------------------------------------------------------
    // Show detail panel
    // --------------------------------------------------------------

    d3.select("#detail-panel")
        .style("display", "block");

    // --------------------------------------------------------------
    // Shrink scatterplot
    // --------------------------------------------------------------

    svg
        .style("top", "66vh")
        .style("height", "34vh");

    // --------------------------------------------------------------
    // Recenter view on highlighted point
    // --------------------------------------------------------------

    const targetScreenY = window.innerHeight * 0.17;

    // Current transformed position of point
    const currentY =
        currentTransform.applyY(selectedPoint.screenY);

    // Shift needed
    const deltaY = targetScreenY - currentY;

    // Create updated transform
    const newTransform = d3.zoomIdentity
        .translate(
            currentTransform.x,
            currentTransform.y + deltaY
        )
        .scale(currentTransform.k);

    // Animate zoom transform
    svg.transition()
        .duration(500)
        .call(
            zoom.transform,
            newTransform
        );
    }
