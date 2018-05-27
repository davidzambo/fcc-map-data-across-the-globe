let render;

(render = (data) => {
    const width = window.innerWidth,
        height = window.innerHeight,
        source = {
            map: "http://enjalot.github.io/wwsd/data/world/world-110m.geojson",
            meteorit: "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/meteorite-strike-data.json"
        };

    const svg = d3.select("body")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    svg.append("rect")
        .attr("width", width)
        .attr("height", height)
        .attr('fill', 'lightblue');

    const projection = d3.geoMercator()
        .scale(200)
        // .center([20.5, 48.6])
        .translate([width / 2, height / 2]);

    const zoom = d3.zoom()
        .scaleExtent([1,8])
        .on('zoom', zoomed);

    const path = d3.geoPath()
        .projection(projection);

    let g = svg.append("g");

    svg.call(zoom);

    function zoomed(){
        console.log('d');
        g.style("stroke-width", 1.5 / d3.event.transform.k + "px");
        g.attr("transform", d3.event.transform);

    }

    d3.json(source.map, function(err, world) {
        g.append("path")
            .attr("d", path(world));
        d3.json(source.meteorit, function(err, meteorit) {
            g.append("path")
                .attr("d", path(meteorit))
                .style("fill", "red");

            // const g = svg.append('g')
            //     .on('wheel.zoom', function(event){
            //        const prevScale = projection.scale();
            //        const nextScale = prevScale - 2 * event.deltaY;
            //        const prevTranslate = projection.translate();
            //        const coords = projection.invert([event.offsetX, event.offsetY]);
            //        projection.scale(nextScale);
            //     });


        });
    });


})();