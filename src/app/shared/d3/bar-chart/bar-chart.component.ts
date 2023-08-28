import { AfterViewInit, Component, ElementRef, Input, ViewChild, } from '@angular/core';
import { BarChartData } from './bar-chart-data.interface';
import * as d3 from 'd3';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements AfterViewInit{

  @ViewChild("bar") bar!: ElementRef
  @Input() title: string = "Bar chart"
  @Input() data: BarChartData[] = []
  @Input() id = ''
  @Input() note = ''
  private width = 0;
  private height = 0;
  private barheight = 0;
  constructor() { }

  ngAfterViewInit(): void {
    this.width = this.bar.nativeElement.offsetWidth
    this.height = this.bar.nativeElement.offsetHeight
    this.drawSvg()
  }

  private drawSvg(): void {
    this.deleteSvg()
    this.calculateBarHeight()
    this.drawChart();
  }

  private deleteSvg(): void{
    d3.select("#" + this.id).html("")
  }

  private calculateBarHeight()
  {
    let max = 0;
    this.data.forEach(x =>
    {
      if(x.Value > max)
      {
        max = x.Value
      }
    })
    this.barheight = Math.ceil(max / 100)* 100
  }

  private drawChart(): void {
    const svg = d3.select("#" + this.id)
    .attr("width", this.width - 50)
    .attr("height", this.height - 50)
    .append("g")
    .attr(
      "transform",
      "translate(" + 50 + "," + 50 + ")"
    );

    // Create the X-axis band scale
    const x = d3.scaleBand()
      .range([0, this.width - 50])
      .domain(this.data.map(d => d.Name))
      .padding(.3);

    // Create the Y-axis band scale
    const y = d3.scaleLinear()
      .domain([0, this.barheight])
      .range([this.height - 165, 0]);

    // Draw the X-axis on the DOM
    const xAxisG = svg.append("g")
      .attr("id", "xAxis")
      .attr("transform", "translate(0," + (this.height - 165) + ")")
      .call(d3.axisBottom(x))

    xAxisG.selectAll(".domain")
      .remove()

    xAxisG.selectAll("text")
      .attr("transform", "translate(-7,0)rotate(-35)")

    // Draw the Y-axis on the DOM
    const yAxisG = svg.append("g")
      .attr("id", "yAxis")
      .call(d3.axisLeft(y))

    yAxisG.selectAll(".domain")
      .remove();

    yAxisG.selectAll(".tick")
      .append("line")
      .attr("x", 1000)

    // Create and fill the bars
    const bars = svg.selectAll("bars")
      .data(this.data)
      .enter()
      .append("g")

    bars.append("rect")
      .attr("class", "bar")
      .attr("id", (d: BarChartData) => d.Name)
      .attr("x", (d: BarChartData) => x(d.Name) ?? "")
      .attr("y", (d: BarChartData) => y(0) ?? "")
      .attr("width", x.bandwidth())
      .attr("height", this.height)

    bars.append("text")
      .text((d: BarChartData) => {
          return d.Value;
      })
      .attr("x", function(d,i){
        let position = x(d.Name)
        if(position != undefined)
        {
          return position + ((x.bandwidth() / 2) - this.clientWidth / 2);
        }
        else return 0;
      })

      .attr("y", function(d){
          return y(d.Value) - 5;
      })


      svg.selectAll("rect")
      .attr("y", (d: any) => y( d.Value ) )
      .attr("height", (d: any) => (this.height - 165) -  y(d.Value))

    var lines:any = []
    document.querySelectorAll("#" + this.id + " .tick").forEach((line: Element) =>
    {
       if(line.children[0].getAttribute("x2") != null)
       {
          lines.push(line)
       }
    });

    lines.forEach( (line: HTMLElement) =>
      {
        var newLine = line.children[0].cloneNode() as HTMLElement;
        line.children[0].remove();
        newLine.setAttribute("class", "tick")
        newLine.setAttribute("x2", this.width.toString());
        newLine.setAttribute("stroke-opacity", "0.5");
        line.append(newLine)
      })

    bars.on("mouseenter", (e: MouseEvent) =>{

    })

    bars.on("mousemove", (e: MouseEvent) =>{

    })

    bars.on("mouseleave", (e: MouseEvent) =>{

    })

    bars.on("click", (e: MouseEvent) => {

    })
  }
}
