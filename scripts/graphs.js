// Copyright Edwin Jones 2012.
// Feel free to use the code for whatever you want,
// but please throw me a little credit back when you are done eh? :)
// http://www.edwinjones.me.uk
// REQUIRES GOOGLE GRAPHING API TO WORK

google.setOnLoadCallback(setupGraphs);

function setupGraphs() {

    //data
    var geodata = google.visualization.arrayToDataTable([
        ['Country', 'Visits'],
        ['United States', 9881],
        ['United Kingdom', 6491],
        ['Germany', 2328],
        ['Canada', 1285],
        ['Netherlands', 1112],
        ['Australia', 948],
        ['Sweden', 919],
        ['France', 820],
        ['Spain', 554],
        ['Denmark', 454],
        ['Hungary', 382],
        ['Russia', 348],
        ['Belgium', 345],
        ['Finland', 331],
        ['Italy', 329],
        ['Ireland', 278],
        ['Austria', 272],
        ['New Zealand', 269],
        ['Brazil', 240],
        ['Czech Republic', 232],
        ['Switzerland', 208],
        ['Poland', 200],
        ['Portugal', 198],
        ['Norway', 189],
        ['Hong Kong', 169],
        ['Japan', 117],
        ['South Africa', 89],
        ['Romania', 82],
        ['Singapore', 77],
        ['China', 75],
        ['Mexico', 70],
        ['Ukraine', 68],
        ['Taiwan', 64],
        ['Belarus', 63],
        ['South Korea', 58],
        ['Slovenia', 53],
        ['Estonia', 52],
        ['Argentina', 51],
        ['India', 50],
        ['Slovakia', 50],
        ['Lithuania', 47],
        ['Turkey', 47],
        ['Philippines', 45],
        ['Indonesia', 44],
        ['Israel', 44],
        ['Malaysia', 44],
        ['Chile', 38],
        ['Greece', 36],
        ['Thailand', 36],
        ['Bulgaria', 33],
        ['Croatia', 31],
        ['Luxembourg', 24],
        ['Latvia', 22],
        ['Serbia', 20],
        ['Colombia', 18],
        ['Puerto Rico', 16],
        ['Iceland', 15],
        ['Peru', 14],
        ['Vietnam', 14],
        ['Malta', 13],
        ['Saudi Arabia', 13],
        ['United Arab Emirates', 11],
        ['Costa Rica', 9],
        ['Jersey', 9],
        ['Paraguay', 9],
        ['Bosnia and Herzegovina', 8],
        ['Kuwait', 8],
        ['Moldova', 7],
        ['Cyprus', 5],
        ['Jordan', 5],
        ['Kenya', 5],
        ['Macedonia (FYROM)', 5],
        ['Venezuela', 5],
        ['Bolivia', 4],
        ['Guatemala', 4],
        ['Kazakhstan', 4],
        ['Liechtenstein', 4],
        ['Pakistan', 4],
        ['Qatar', 4],
        ['Tunisia', 4],
        ['Bangladesh', 3],
        ['Dominican Republic', 3],
        ['Guam', 3],
        ['Isle of Man', 3],
        ['Iran', 3],
        ['Panama', 3],
        ['El Salvador', 3],
        ['Uruguay', 3],
        ['Andorra', 2],
        ['Brunei', 2],
        ['Algeria', 2],
        ['Ecuador', 2],
        ['Egypt', 2],
        ['Faroe Islands', 2],
        ['Guernsey', 2],
        ['Lebanon', 2],
        ['Maldives', 2],
        ['New Caledonia', 2],
        ['Nicaragua', 2],
        ['Senegal', 2],
        ['Kosovo', 2],
        ['Afghanistan', 1],
        ['Albania', 1],
        ['Azerbaijan', 1],
        ['Benin', 1],
        ['Bahamas', 1],
        ['Ethiopia', 1],
        ['Fiji', 1],
        ['Gibraltar', 1],
        ['Guyana', 1],
        ['Kyrgyzstan', 1],
        ['Cambodia', 1],
        ['Cayman Islands', 1],
        ['Sri Lanka', 1],
        ['Lesotho', 1],
        ['Morocco', 1],
        ['Montenegro', 1],
        ['Macau', 1],
        ['Martinique', 1],
        ['Nepal', 1],
        ['Réunion', 1],
        ['Turks and Caicos Islands', 1],
        ['Trinidad and Tobago', 1],   
    ]);


    var piedata = google.visualization.arrayToDataTable([
      ['Page', 'Visits'],
      ['Home', 2017],
      ['Rants', 35313],
      ['Game Design', 876],
      ['3D Modelling', 649],
      ['Javascript', 543],
      ['Flash', 362],
      ['Photoshop', 610],
    ]);

    var linedata = google.visualization.arrayToDataTable([
         ['Year', 'Max Visits Per Day', 'Mobile Visits', 'Tablet Visits'],
         ['2012', 894, 24, 9],
         ['2013', 6782, 561, 465],
         ['2014', 3326, 243, 188],
    ]);

    //options
    var geooptions = { colorAxis: { colors: ['#FFCCCC', '#990000'] } };
    var geochart = new google.visualization.GeoChart(document.getElementById('regions_div'));

    var pieoptions = {is3D: true,};
    var piechart = new google.visualization.PieChart(document.getElementById('pie_div'));

    var lineoptions = {};
    var linechart = new google.visualization.LineChart(document.getElementById('line_div'));

    //draw calls.
    geochart.draw(geodata, geooptions);
    piechart.draw(piedata, pieoptions);
    linechart.draw(linedata, lineoptions);
}