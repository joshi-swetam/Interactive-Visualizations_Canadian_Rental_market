// A function to determine the marker size 
function markerSizerent(rent) {
  return (rent) * 25;
}
function markerSizevr(vr) {
  return (vr) * 10000;
}
// function markerSizeunits(unit) {
//   return (unit)/75;
// }
// function to determine the colors
function markerColor(d) {
    return d < 500 ? "#02f1f5" :
    d < 1000? "#f0f00a" :
    d < 1200 ? "#15f00a" :
    d < 1500 ? '#eb2b09' :
    d < 1800? "#f5020b" :
    d < 2000 ? "#eb6b09" :
    "#ba1c1c";
  }
  function markerColorvr(d) {
    return d > 6? "#407353" :
    d > 5 ? "#f0f00a" :
    d > 4 ? "#15f00a" :
    d > 3 ? '#f00e12' :
    d > 2 ? "#eb6b09" :
    d > 1 ?  "#f5020b":
    "#ba1c1c";
  }

let locations = [
    {
      "AvearageVacancytRate": {
        "1br": 1.3443181818181817,
        "2br": 1.8845849802371542,
        "3br+": 4.024074074074074,
        "Bachelor": 2.3655999999999997,
        "Total": 1.5353124999999999
      },
      "AverageRents": {
        "1br": 1375.7363636363636,
        "2br": 1833.86646884273,
        "3br+": 2299.994652406417,
        "Bachelor": 1178.3254901960784,
        "Total": 1555.0304709141274
      },
      "Filter": {
        "Center": "Vancouver",
        "CenterGeo": {
          "Lat": 49.2608724,
          "Lon": -123.113952
        },
        "DwellingType": "na",
        "Neighbourhood": "na",
        "Province": "B.C.",
        "Year": "na",
        "Zone": "na"
      },
      "TotalNumberOfUnits": {
        "1br": 348385.0,
        "2br": 145737.0,
        "3br+": 20746.0,
        "Bachelor": 64597.0,
        "Total": 579465.0
      }
    },
    {
      "AvearageVacancytRate": {
        "1br": 3.559504132231405,
        "2br": 3.404878048780487,
        "3br+": 5.072222222222222,
        "Bachelor": 3.49375,
        "Total": 3.511585365853659
      },
      "AverageRents": {
        "1br": 950.4154929577464,
        "2br": 1178.3885350318471,
        "3br+": 1494.921875,
        "Bachelor": 748.0754716981132,
        "Total": 1129.7164179104477
      },
      "Filter": {
        "Center": "Winnipeg",
        "CenterGeo": {
          "Lat": 49.8955367,
          "Lon": -97.1384584
        },
        "DwellingType": "na",
        "Neighbourhood": "na",
        "Province": "Man.",
        "Year": "na",
        "Zone": "na"
      },
      "TotalNumberOfUnits": {
        "1br": 150244.0,
        "2br": 140459.0,
        "3br+": 16176.0,
        "Bachelor": 20220.0,
        "Total": 327099.0
      }
    },
    {
      "AvearageVacancytRate": {
        "1br": 2.526666666666667,
        "2br": 1.9000000000000004,
        "3br+": 1.6875,
        "Bachelor": NaN,
        "Total": 1.8846153846153848
      },
      "AverageRents": {
        "1br": 1197.05,
        "2br": 1334.2,
        "3br+": 1554.851851851852,
        "Bachelor": 955.4666666666667,
        "Total": 1368.2758620689656
      },
      "Filter": {
        "Center": "Oshawa",
        "CenterGeo": {
          "Lat": 43.8975558,
          "Lon": -78.8635324
        },
        "DwellingType": "na",
        "Neighbourhood": "na",
        "Province": "Ont.",
        "Year": "na",
        "Zone": "na"
      },
      "TotalNumberOfUnits": {
        "1br": 19222.0,
        "2br": 35211.0,
        "3br+": 9284.0,
        "Bachelor": 1875.0,
        "Total": 65592.0
      }
    },
    {
      "AvearageVacancytRate": {
        "1br": 2.404310344827586,
        "2br": 1.6495575221238936,
        "3br+": 1.3951754385964914,
        "Bachelor": 3.473846153846154,
        "Total": 1.9425225225225224
      },
      "AverageRents": {
        "1br": 1347.514096185738,
        "2br": 1603.8308702791462,
        "3br+": 1824.8958333333333,
        "Bachelor": 1083.8861985472156,
        "Total": 1480.7747336377474
      },
      "Filter": {
        "Center": "Toronto",
        "CenterGeo": {
          "Lat": 43.6534817,
          "Lon": -79.3839347
        },
        "DwellingType": "na",
        "Neighbourhood": "na",
        "Province": "Ont.",
        "Year": "na",
        "Zone": "na"
      },
      "TotalNumberOfUnits": {
        "1br": 663089.0,
        "2br": 678256.0,
        "3br+": 168013.0,
        "Bachelor": 122564.0,
        "Total": 1632921.0
      }
    },
    {
      "AvearageVacancytRate": {
        "1br": 4.221379310344828,
        "2br": 4.294791666666666,
        "3br+": 4.9984375,
        "Bachelor": 5.511111111111111,
        "Total": 3.8815450643776823
      },
      "AverageRents": {
        "1br": 1064.4764150943397,
        "2br": 1253.8918918918919,
        "3br+": 1374.5396825396826,
        "Bachelor": 854.6428571428571,
        "Total": 1195.6258992805756
      },
      "Filter": {
        "Center": "Calgary",
        "CenterGeo": {
          "Lat": 51.0460954,
          "Lon": -114.065465
        },
        "DwellingType": "na",
        "Neighbourhood": "na",
        "Province": "Alta",
        "Year": "na",
        "Zone": "na"
      },
      "TotalNumberOfUnits": {
        "1br": 102671.0,
        "2br": 107340.0,
        "3br+": 17806.0,
        "Bachelor": 7667.0,
        "Total": 235484.0
      }
    },
    {
      "AvearageVacancytRate": {
        "1br": 1.395,
        "2br": 1.8307692307692311,
        "3br+": 3.4,
        "Bachelor": 4.119999999999999,
        "Total": 1.6730769230769231
      },
      "AverageRents": {
        "1br": 989.7083333333334,
        "2br": 1233.7307692307693,
        "3br+": 1526.125,
        "Bachelor": 825.7647058823529,
        "Total": 1124.423076923077
      },
      "Filter": {
        "Center": "Abbotsford - Mission",
        "CenterGeo": {
          "Lat": 49.071653,
          "Lon": -122.269288
        },
        "DwellingType": "na",
        "Neighbourhood": "na",
        "Province": "B.C.",
        "Year": "na",
        "Zone": "na"
      },
      "TotalNumberOfUnits": {
        "1br": 10983.0,
        "2br": 11685.0,
        "3br+": 872.0,
        "Bachelor": 839.0,
        "Total": 24379.0
      }
    },
    {
      "AvearageVacancytRate": {
        "1br": 1.4685393258426964,
        "2br": 1.6563218390804597,
        "3br+": 6.59090909090909,
        "Bachelor": 1.6365853658536584,
        "Total": 1.5038095238095235
      },
      "AverageRents": {
        "1br": 1175.5403225806451,
        "2br": 1507.6949152542372,
        "3br+": 1930.862745098039,
        "Bachelor": 976.8426966292135,
        "Total": 1329.5547445255474
      },
      "Filter": {
        "Center": "Victoria",
        "CenterGeo": {
          "Lat": 48.4283182,
          "Lon": -123.3649533
        },
        "DwellingType": "na",
        "Neighbourhood": "na",
        "Province": "B.C.",
        "Year": "na",
        "Zone": "na"
      },
      "TotalNumberOfUnits": {
        "1br": 75540.0,
        "2br": 44149.0,
        "3br+": 4758.0,
        "Bachelor": 15983.0,
        "Total": 140430.0
      }
    },
    {
      "AvearageVacancytRate": {
        "1br": 1.5428571428571427,
        "2br": 1.1777777777777778,
        "3br+": 2.466666666666667,
        "Bachelor": 2.675,
        "Total": 1.7807692307692307
      },
      "AverageRents": {
        "1br": 515.7301587301587,
        "2br": 641.5294117647059,
        "3br+": 719.015625,
        "Bachelor": 424.7083333333333,
        "Total": 649.8378378378378
      },
      "Filter": {
        "Center": "Trois-Rivi\u00e8res",
        "CenterGeo": {
          "Lat": 46.3432325,
          "Lon": -72.5428485
        },
        "DwellingType": "na",
        "Neighbourhood": "na",
        "Province": "Que",
        "Year": "na",
        "Zone": "na"
      },
      "TotalNumberOfUnits": {
        "1br": 24055.0,
        "2br": 47086.0,
        "3br+": 21320.0,
        "Bachelor": 3209.0,
        "Total": 95670.0
      }
    },
    {
      "AvearageVacancytRate": {
        "1br": 2.12625,
        "2br": 2.132,
        "3br+": 2.1657894736842103,
        "Bachelor": 3.2583333333333333,
        "Total": 2.0693548387096774
      },
      "AverageRents": {
        "1br": 954.2735849056604,
        "2br": 1149.2761194029852,
        "3br+": 1428.906976744186,
        "Bachelor": 758.2033898305085,
        "Total": 1143.986111111111
      },
      "Filter": {
        "Center": "London",
        "CenterGeo": {
          "Lat": 42.9832406,
          "Lon": -81.243372
        },
        "DwellingType": "na",
        "Neighbourhood": "na",
        "Province": "Ont.",
        "Year": "na",
        "Zone": "na"
      },
      "TotalNumberOfUnits": {
        "1br": 91828.0,
        "2br": 132378.0,
        "3br+": 22312.0,
        "Bachelor": 5952.0,
        "Total": 252470.0
      }
    },
    {
      "AvearageVacancytRate": {
        "1br": 2.0721649484536084,
        "2br": 2.020618556701031,
        "3br+": 1.8761904761904764,
        "Bachelor": 2.0780000000000003,
        "Total": 2.218571428571429
      },
      "AverageRents": {
        "1br": 1216.594827586207,
        "2br": 1471.2517482517483,
        "3br+": 1670.4747474747476,
        "Bachelor": 987.3695652173913,
        "Total": 1391.36
      },
      "Filter": {
        "Center": "Ottawa",
        "CenterGeo": {
          "Lat": 45.4208777,
          "Lon": -75.6901106
        },
        "DwellingType": "na",
        "Neighbourhood": "na",
        "Province": "Ont.",
        "Year": "na",
        "Zone": "na"
      },
      "TotalNumberOfUnits": {
        "1br": 152673.0,
        "2br": 145249.0,
        "3br+": 41935.0,
        "Bachelor": 27241.0,
        "Total": 367098.0
      }
    },
    {
      "AvearageVacancytRate": {
        "1br": 2.9247058823529413,
        "2br": 3.1655913978494623,
        "3br+": 3.0084745762711864,
        "Bachelor": 7.1,
        "Total": 2.9629310344827586
      },
      "AverageRents": {
        "1br": 1096.5192307692307,
        "2br": 1283.6810344827586,
        "3br+": 1484.4851485148515,
        "Bachelor": 847.9491525423729,
        "Total": 1244.4485294117646
      },
      "Filter": {
        "Center": "Hamilton",
        "CenterGeo": {
          "Lat": 43.2560802,
          "Lon": -79.8728583
        },
        "DwellingType": "na",
        "Neighbourhood": "na",
        "Province": "Ont.",
        "Year": "na",
        "Zone": "na"
      },
      "TotalNumberOfUnits": {
        "1br": 96271.0,
        "2br": 109709.0,
        "3br+": 20838.0,
        "Bachelor": 8589.0,
        "Total": 235407.0
      }
    },
    {
      "AvearageVacancytRate": {
        "1br": 1.614814814814815,
        "2br": 1.929850746268657,
        "3br+": 2.3153846153846156,
        "Bachelor": 2.766666666666667,
        "Total": 1.8568181818181821
      },
      "AverageRents": {
        "1br": 1082.7333333333333,
        "2br": 1221.3152173913043,
        "3br+": 1341.4318181818182,
        "Bachelor": 850.7021276595744,
        "Total": 1184.3529411764705
      },
      "Filter": {
        "Center": "Kitchener - Cambridge - Waterl",
        "CenterGeo": {
          "Lat": 43.418345,
          "Lon": -80.468831
        },
        "DwellingType": "na",
        "Neighbourhood": "na",
        "Province": "Ont.",
        "Year": "na",
        "Zone": "na"
      },
      "TotalNumberOfUnits": {
        "1br": 57363.0,
        "2br": 114765.0,
        "3br+": 17201.0,
        "Bachelor": 4062.0,
        "Total": 193391.0
      }
    },
    {
      "AvearageVacancytRate": {
        "1br": 4.5760000000000005,
        "2br": 4.4,
        "3br+": 4.5375,
        "Bachelor": 13.649999999999999,
        "Total": 4.300000000000001
      },
      "AverageRents": {
        "1br": 888.9615384615385,
        "2br": 989.7291666666666,
        "3br+": 1123.3333333333333,
        "Bachelor": 821.5333333333333,
        "Total": 994.607476635514
      },
      "Filter": {
        "Center": "Lethbridge",
        "CenterGeo": {
          "Lat": 49.6945782,
          "Lon": -112.8331033
        },
        "DwellingType": "na",
        "Neighbourhood": "na",
        "Province": "Alta",
        "Year": "na",
        "Zone": "na"
      },
      "TotalNumberOfUnits": {
        "1br": 4609.0,
        "2br": 11631.0,
        "3br+": 2944.0,
        "Bachelor": 978.0,
        "Total": 20162.0
      }
    },
    {
      "AvearageVacancytRate": {
        "1br": 1.666666666666667,
        "2br": 1.5416666666666667,
        "3br+": 2.325,
        "Bachelor": 1.48,
        "Total": 1.5142857142857142
      },
      "AverageRents": {
        "1br": 1065.0,
        "2br": 1291.85,
        "3br+": 1732.625,
        "Bachelor": 949.625,
        "Total": 1313.5
      },
      "Filter": {
        "Center": "Kelowna",
        "CenterGeo": {
          "Lat": 49.8879177,
          "Lon": -119.495902
        },
        "DwellingType": "na",
        "Neighbourhood": "na",
        "Province": "B.C.",
        "Year": "na",
        "Zone": "na"
      },
      "TotalNumberOfUnits": {
        "1br": 12596.0,
        "2br": 18106.0,
        "3br+": 1660.0,
        "Bachelor": 3948.0,
        "Total": 36310.0
      }
    },
    {
      "AvearageVacancytRate": {
        "1br": 2.9,
        "2br": 2.5894736842105264,
        "3br+": 1.8499999999999999,
        "Bachelor": 2.2,
        "Total": 2.738095238095238
      },
      "AverageRents": {
        "1br": 950.8461538461538,
        "2br": 1108.08,
        "3br+": 1337.9166666666667,
        "Bachelor": 766.25,
        "Total": 1064.72
      },
      "Filter": {
        "Center": "Belleville",
        "CenterGeo": {
          "Lat": 44.2436328,
          "Lon": -77.3607597
        },
        "DwellingType": "na",
        "Neighbourhood": "na",
        "Province": "Ont.",
        "Year": "na",
        "Zone": "na"
      },
      "TotalNumberOfUnits": {
        "1br": 8758.0,
        "2br": 19291.0,
        "3br+": 1611.0,
        "Bachelor": 588.0,
        "Total": 30248.0
      }
    },
    {
      "AvearageVacancytRate": {
        "1br": 5.892307692307692,
        "2br": 4.986666666666667,
        "3br+": 4.84,
        "Bachelor": 6.0125,
        "Total": 4.936842105263158
      },
      "AverageRents": {
        "1br": 807.3684210526316,
        "2br": 900.5555555555555,
        "3br+": 912.6,
        "Bachelor": 739.8,
        "Total": 881.9642857142857
      },
      "Filter": {
        "Center": "St. John's",
        "CenterGeo": {
          "Lat": 47.5614705,
          "Lon": -52.7126162
        },
        "DwellingType": "na",
        "Neighbourhood": "na",
        "Province": "Nfld.Lab.",
        "Year": "na",
        "Zone": "na"
      },
      "TotalNumberOfUnits": {
        "1br": 6574.0,
        "2br": 10905.0,
        "3br+": 1579.0,
        "Bachelor": 1864.0,
        "Total": 20922.0
      }
    },
    {
      "AvearageVacancytRate": {
        "1br": 2.3633333333333337,
        "2br": 2.2108695652173913,
        "3br+": 1.3571428571428572,
        "Bachelor": 14.6,
        "Total": 2.1725806451612906
      },
      "AverageRents": {
        "1br": 955.3186813186813,
        "2br": 1121.0,
        "3br+": 1262.735294117647,
        "Bachelor": 801.7272727272727,
        "Total": 1049.640350877193
      },
      "Filter": {
        "Center": "St. Catharines - Niagara",
        "CenterGeo": {
          "Lat": 43.1579812,
          "Lon": -79.2441003
        },
        "DwellingType": "na",
        "Neighbourhood": "na",
        "Province": "Ont.",
        "Year": "na",
        "Zone": "na"
      },
      "TotalNumberOfUnits": {
        "1br": 28889.0,
        "2br": 44622.0,
        "3br+": 8931.0,
        "Bachelor": 2490.0,
        "Total": 84932.0
      }
    },
    {
      "AvearageVacancytRate": {
        "1br": 1.2333333333333334,
        "2br": 1.0,
        "3br+": 1.0416666666666667,
        "Bachelor": 4.533333333333333,
        "Total": 1.0461538461538462
      },
      "AverageRents": {
        "1br": 775.2666666666667,
        "2br": 961.2549019607843,
        "3br+": 1071.5121951219512,
        "Bachelor": 683.6875,
        "Total": 933.9622641509434
      },
      "Filter": {
        "Center": "Gatineau",
        "CenterGeo": {
          "Lat": 45.4277659,
          "Lon": -75.710976
        },
        "DwellingType": "na",
        "Neighbourhood": "na",
        "Province": "Que",
        "Year": "na",
        "Zone": "na"
      },
      "TotalNumberOfUnits": {
        "1br": 30009.0,
        "2br": 74762.0,
        "3br+": 16939.0,
        "Bachelor": 4499.0,
        "Total": 126209.0
      }
    },
    {
      "AvearageVacancytRate": {
        "1br": 2.8533333333333335,
        "2br": 1.5705882352941178,
        "3br+": 2.433333333333333,
        "Bachelor": 4.1,
        "Total": 1.903703703703704
      },
      "AverageRents": {
        "1br": 992.0666666666667,
        "2br": 1129.6666666666667,
        "3br+": 1211.2,
        "Bachelor": 796.0,
        "Total": 1114.5277777777778
      },
      "Filter": {
        "Center": "Brantford",
        "CenterGeo": {
          "Lat": 43.1408157,
          "Lon": -80.2631733
        },
        "DwellingType": "na",
        "Neighbourhood": "na",
        "Province": "Ont.",
        "Year": "na",
        "Zone": "na"
      },
      "TotalNumberOfUnits": {
        "1br": 7757.0,
        "2br": 14796.0,
        "3br+": 4670.0,
        "Bachelor": 395.0,
        "Total": 27618.0
      }
    },
    {
      "AvearageVacancytRate": {
        "1br": 4.1899999999999995,
        "2br": 2.1999999999999997,
        "3br+": 4.566666666666667,
        "Bachelor": 3.6,
        "Total": 2.730769230769231
      },
      "AverageRents": {
        "1br": 716.1904761904761,
        "2br": 834.5714285714286,
        "3br+": 904.0909090909091,
        "Bachelor": 597.4583333333334,
        "Total": 796.0222222222222
      },
      "Filter": {
        "Center": "Saint John",
        "CenterGeo": {
          "Lat": 45.3411746,
          "Lon": -65.7634472
        },
        "DwellingType": "na",
        "Neighbourhood": "na",
        "Province": "N.B.",
        "Year": "na",
        "Zone": "na"
      },
      "TotalNumberOfUnits": {
        "1br": 12866.0,
        "2br": 27168.0,
        "3br+": 7723.0,
        "Bachelor": 1957.0,
        "Total": 49714.0
      }
    },
    {
      "AvearageVacancytRate": {
        "1br": 2.388888888888889,
        "2br": 2.233333333333333,
        "3br+": 1.6285714285714286,
        "Bachelor": NaN,
        "Total": 2.6894736842105265
      },
      "AverageRents": {
        "1br": 491.7878787878788,
        "2br": 671.8461538461538,
        "3br+": 769.4545454545455,
        "Bachelor": 464.6190476190476,
        "Total": 655.7560975609756
      },
      "Filter": {
        "Center": "Saguenay",
        "CenterGeo": {
          "Lat": 48.405959,
          "Lon": -71.069183
        },
        "DwellingType": "na",
        "Neighbourhood": "na",
        "Province": "Que",
        "Year": "na",
        "Zone": "na"
      },
      "TotalNumberOfUnits": {
        "1br": 15054.0,
        "2br": 50472.0,
        "3br+": 10567.0,
        "Bachelor": 1841.0,
        "Total": 77934.0
      }
    },
    {
      "AvearageVacancytRate": {
        "1br": 5.470967741935484,
        "2br": 5.802666666666666,
        "3br+": 6.2558823529411764,
        "Bachelor": 5.889473684210526,
        "Total": 5.334177215189873
      },
      "AverageRents": {
        "1br": 981.0731707317074,
        "2br": 1141.593023255814,
        "3br+": 1331.016393442623,
        "Bachelor": 739.1739130434783,
        "Total": 1104.8791208791208
      },
      "Filter": {
        "Center": "Saskatoon",
        "CenterGeo": {
          "Lat": 52.131802,
          "Lon": -106.660767
        },
        "DwellingType": "na",
        "Neighbourhood": "na",
        "Province": "Sask.",
        "Year": "na",
        "Zone": "na"
      },
      "TotalNumberOfUnits": {
        "1br": 27088.0,
        "2br": 42616.0,
        "3br+": 5421.0,
        "Bachelor": 3105.0,
        "Total": 78230.0
      }
    },
    {
      "AvearageVacancytRate": {
        "1br": 3.558974358974359,
        "2br": 2.1516949152542373,
        "3br+": 1.5780487804878054,
        "Bachelor": 2.2370370370370374,
        "Total": 2.35944055944056
      },
      "AverageRents": {
        "1br": 755.5828571428572,
        "2br": 880.3285714285714,
        "3br+": 1019.1739130434783,
        "Bachelor": 590.5398230088496,
        "Total": 862.1221719457013
      },
      "Filter": {
        "Center": "Qu\u00e9bec",
        "CenterGeo": {
          "Lat": 46.8137431,
          "Lon": -71.2084061
        },
        "DwellingType": "na",
        "Neighbourhood": "na",
        "Province": "Que",
        "Year": "na",
        "Zone": "na"
      },
      "TotalNumberOfUnits": {
        "1br": 127239.0,
        "2br": 259796.0,
        "3br+": 64814.0,
        "Bachelor": 29174.0,
        "Total": 481023.0
      }
    },
    {
      "AvearageVacancytRate": {
        "1br": 1.907281553398058,
        "2br": 1.422077922077922,
        "3br+": 1.1140186915887849,
        "Bachelor": 3.1366666666666667,
        "Total": 1.4979591836734694
      },
      "AverageRents": {
        "1br": 787.9621212121212,
        "2br": 914.7594142259414,
        "3br+": 1074.7855227882037,
        "Bachelor": 641.2945736434109,
        "Total": 898.7242063492064
      },
      "Filter": {
        "Center": "Montr\u00e9al",
        "CenterGeo": {
          "Lat": 45.5031824,
          "Lon": -73.5698065
        },
        "DwellingType": "na",
        "Neighbourhood": "na",
        "Province": "Que",
        "Year": "na",
        "Zone": "na"
      },
      "TotalNumberOfUnits": {
        "1br": 766328.0,
        "2br": 1662800.0,
        "3br+": 351223.0,
        "Bachelor": 235926.0,
        "Total": 3016277.0
      }
    },
    {
      "AvearageVacancytRate": {
        "1br": 1.4170731707317072,
        "2br": 1.1670329670329669,
        "3br+": 2.5205128205128204,
        "Bachelor": 1.4,
        "Total": 1.3128440366972476
      },
      "AverageRents": {
        "1br": 988.6422018348624,
        "2br": 1271.1463414634147,
        "3br+": 1536.938775510204,
        "Bachelor": 814.1896551724138,
        "Total": 1221.6853146853148
      },
      "Filter": {
        "Center": "Halifax",
        "CenterGeo": {
          "Lat": 44.648618,
          "Lon": -63.5859487
        },
        "DwellingType": "na",
        "Neighbourhood": "na",
        "Province": "N.S.",
        "Year": "na",
        "Zone": "na"
      },
      "TotalNumberOfUnits": {
        "1br": 87490.0,
        "2br": 139403.0,
        "3br+": 21836.0,
        "Bachelor": 13686.0,
        "Total": 263414.0
      }
    },
    {
      "AvearageVacancytRate": {
        "1br": 1.5857142857142859,
        "2br": 1.8736842105263163,
        "3br+": 3.5999999999999996,
        "Bachelor": 1.5,
        "Total": 1.9347826086956526
      },
      "AverageRents": {
        "1br": 994.4761904761905,
        "2br": 1208.36,
        "3br+": 1449.2941176470588,
        "Bachelor": 813.9333333333333,
        "Total": 1148.142857142857
      },
      "Filter": {
        "Center": "Peterborough",
        "CenterGeo": {
          "Lat": 44.3048009,
          "Lon": -78.3199496
        },
        "DwellingType": "na",
        "Neighbourhood": "na",
        "Province": "Ont.",
        "Year": "na",
        "Zone": "na"
      },
      "TotalNumberOfUnits": {
        "1br": 10961.0,
        "2br": 17446.0,
        "3br+": 3629.0,
        "Bachelor": 868.0,
        "Total": 32904.0
      }
    },
    {
      "AvearageVacancytRate": {
        "1br": 2.7214285714285715,
        "2br": 2.119047619047619,
        "3br+": 3.8000000000000003,
        "Bachelor": 5.7,
        "Total": 2.385714285714286
      },
      "AverageRents": {
        "1br": 1265.6,
        "2br": 1418.0416666666667,
        "3br+": 1549.5833333333333,
        "Bachelor": 921.0,
        "Total": 1407.3666666666666
      },
      "Filter": {
        "Center": "Barrie",
        "CenterGeo": {
          "Lat": 44.3893113,
          "Lon": -79.6901736
        },
        "DwellingType": "na",
        "Neighbourhood": "na",
        "Province": "Ont.",
        "Year": "na",
        "Zone": "na"
      },
      "TotalNumberOfUnits": {
        "1br": 6132.0,
        "2br": 11502.0,
        "3br+": 2745.0,
        "Bachelor": 611.0,
        "Total": 20990.0
      }
    },
    {
      "AvearageVacancytRate": {
        "1br": 2.015789473684211,
        "2br": 1.6333333333333333,
        "3br+": 0.8875000000000001,
        "Bachelor": 4.033333333333333,
        "Total": 1.65
      },
      "AverageRents": {
        "1br": 1189.35,
        "2br": 1373.92,
        "3br+": 1476.1363636363637,
        "Bachelor": 884.7894736842105,
        "Total": 1338.2307692307693
      },
      "Filter": {
        "Center": "Guelph",
        "CenterGeo": {
          "Lat": 43.5460516,
          "Lon": -80.2493276
        },
        "DwellingType": "na",
        "Neighbourhood": "na",
        "Province": "Ont.",
        "Year": "na",
        "Zone": "na"
      },
      "TotalNumberOfUnits": {
        "1br": 12734.0,
        "2br": 23348.0,
        "3br+": 4242.0,
        "Bachelor": 1018.0,
        "Total": 41342.0
      }
    },
    {
      "AvearageVacancytRate": {
        "1br": 1.3647058823529412,
        "2br": 1.4826086956521742,
        "3br+": 3.0333333333333337,
        "Bachelor": 1.1,
        "Total": 2.11875
      },
      "AverageRents": {
        "1br": 885.046511627907,
        "2br": 1154.8688524590164,
        "3br+": 1304.7083333333333,
        "Bachelor": 715.25,
        "Total": 1086.2769230769231
      },
      "Filter": {
        "Center": "Greater Sudbury / Grand Sudbur",
        "CenterGeo": {
          "Lat": 46.577851,
          "Lon": -81.00786
        },
        "DwellingType": "na",
        "Neighbourhood": "na",
        "Province": "Ont.",
        "Year": "na",
        "Zone": "na"
      },
      "TotalNumberOfUnits": {
        "1br": 19556.0,
        "2br": 35472.0,
        "3br+": 6424.0,
        "Bachelor": 3712.0,
        "Total": 65164.0
      }
    },
    {
      "AvearageVacancytRate": {
        "1br": 1.4903225806451614,
        "2br": 1.4189189189189189,
        "3br+": 1.2,
        "Bachelor": 2.0833333333333335,
        "Total": 1.6309090909090904
      },
      "AverageRents": {
        "1br": 1115.469696969697,
        "2br": 1310.3055555555557,
        "3br+": 1626.625,
        "Bachelor": 861.1538461538462,
        "Total": 1282.123287671233
      },
      "Filter": {
        "Center": "Kingston",
        "CenterGeo": {
          "Lat": 44.3054151,
          "Lon": -76.4283781
        },
        "DwellingType": "na",
        "Neighbourhood": "na",
        "Province": "Ont.",
        "Year": "na",
        "Zone": "na"
      },
      "TotalNumberOfUnits": {
        "1br": 23867.0,
        "2br": 40526.0,
        "3br+": 5071.0,
        "Bachelor": 3511.0,
        "Total": 72975.0
      }
    },
    {
      "AvearageVacancytRate": {
        "1br": 3.2681818181818185,
        "2br": 3.2814814814814817,
        "3br+": 11.48,
        "Bachelor": 7.9,
        "Total": 4.396875
      },
      "AverageRents": {
        "1br": 903.030303030303,
        "2br": 1138.4615384615386,
        "3br+": 1311.0,
        "Bachelor": 734.3478260869565,
        "Total": 1061.4285714285713
      },
      "Filter": {
        "Center": "Thunder Bay",
        "CenterGeo": {
          "Lat": 48.406414,
          "Lon": -89.259796
        },
        "DwellingType": "na",
        "Neighbourhood": "na",
        "Province": "Ont.",
        "Year": "na",
        "Zone": "na"
      },
      "TotalNumberOfUnits": {
        "1br": 10125.0,
        "2br": 15346.0,
        "3br+": 2828.0,
        "Bachelor": 1553.0,
        "Total": 29852.0
      }
    },
    {
      "AvearageVacancytRate": {
        "1br": 2.429032258064516,
        "2br": 1.7058823529411762,
        "3br+": 1.5,
        "Bachelor": 4.099999999999999,
        "Total": 2.4846153846153842
      },
      "AverageRents": {
        "1br": 919.655737704918,
        "2br": 1060.8235294117646,
        "3br+": 1161.8,
        "Bachelor": 726.8709677419355,
        "Total": 976.5428571428571
      },
      "Filter": {
        "Center": "Windsor",
        "CenterGeo": {
          "Lat": 42.2858536,
          "Lon": -82.9780695
        },
        "DwellingType": "na",
        "Neighbourhood": "na",
        "Province": "Ont.",
        "Year": "na",
        "Zone": "na"
      },
      "TotalNumberOfUnits": {
        "1br": 39580.0,
        "2br": 31439.0,
        "3br+": 3522.0,
        "Bachelor": 6013.0,
        "Total": 80554.0
      }
    },
    {
      "AvearageVacancytRate": {
        "1br": 5.164347826086956,
        "2br": 5.554416961130743,
        "3br+": 5.248128342245989,
        "Bachelor": 6.780952380952381,
        "Total": 5.17774647887324
      },
      "AverageRents": {
        "1br": 1028.017667844523,
        "2br": 1213.48,
        "3br+": 1375.8924731182797,
        "Bachelor": 842.530487804878,
        "Total": 1189.5587467362925
      },
      "Filter": {
        "Center": "Edmonton",
        "CenterGeo": {
          "Lat": 53.5462055,
          "Lon": -113.491241
        },
        "DwellingType": "na",
        "Neighbourhood": "na",
        "Province": "Alta",
        "Year": "na",
        "Zone": "na"
      },
      "TotalNumberOfUnits": {
        "1br": 155768.0,
        "2br": 186813.0,
        "3br+": 46221.0,
        "Bachelor": 20917.0,
        "Total": 409719.0
      }
    },
    {
      "AvearageVacancytRate": {
        "1br": 2.3576923076923073,
        "2br": 1.9604651162790696,
        "3br+": 12.4,
        "Bachelor": 4.885714285714286,
        "Total": 2.0137254901960784
      },
      "AverageRents": {
        "1br": 792.9636363636364,
        "2br": 972.5081967213115,
        "3br+": 1039.0645161290322,
        "Bachelor": 678.7692307692307,
        "Total": 935.655737704918
      },
      "Filter": {
        "Center": "Moncton",
        "CenterGeo": {
          "Lat": 46.097995,
          "Lon": -64.80011
        },
        "DwellingType": "na",
        "Neighbourhood": "na",
        "Province": "N.B.",
        "Year": "na",
        "Zone": "na"
      },
      "TotalNumberOfUnits": {
        "1br": 15710.0,
        "2br": 46930.0,
        "3br+": 2899.0,
        "Bachelor": 2378.0,
        "Total": 67917.0
      }
    },
    {
      "AvearageVacancytRate": {
        "1br": 1.8823529411764706,
        "2br": 1.3707317073170733,
        "3br+": 1.588,
        "Bachelor": 3.9,
        "Total": 1.525
      },
      "AverageRents": {
        "1br": 575.1086956521739,
        "2br": 690.0754716981132,
        "3br+": 849.8367346938776,
        "Bachelor": 504.51428571428573,
        "Total": 703.1785714285714
      },
      "Filter": {
        "Center": "Sherbrooke",
        "CenterGeo": {
          "Lat": 45.403271,
          "Lon": -71.889038
        },
        "DwellingType": "na",
        "Neighbourhood": "na",
        "Province": "Que",
        "Year": "na",
        "Zone": "na"
      },
      "TotalNumberOfUnits": {
        "1br": 40278.0,
        "2br": 95074.0,
        "3br+": 35559.0,
        "Bachelor": 11628.0,
        "Total": 182539.0
      }
    },
    {
      "AvearageVacancytRate": {
        "1br": 7.63855421686747,
        "2br": 6.672413793103447,
        "3br+": 7.9696969696969715,
        "Bachelor": 9.510344827586206,
        "Total": 6.93069306930693
      },
      "AverageRents": {
        "1br": 928.51,
        "2br": 1098.9278350515465,
        "3br+": 1370.090909090909,
        "Bachelor": 722.8333333333334,
        "Total": 1051.3703703703704
      },
      "Filter": {
        "Center": "Regina",
        "CenterGeo": {
          "Lat": 50.44876,
          "Lon": -104.61731
        },
        "DwellingType": "na",
        "Neighbourhood": "na",
        "Province": "Sask.",
        "Year": "na",
        "Zone": "na"
      },
      "TotalNumberOfUnits": {
        "1br": 26645.0,
        "2br": 38155.0,
        "3br+": 5092.0,
        "Bachelor": 3243.0,
        "Total": 73135.0
      }
    }
  ]
// Define arrays to hold the markers.
let RentMarkers = [] ;
let VRMarkers = [] ;
// let UnitsMarkers = []

// Loop through locations, and create the markers.
for (let i = 0; i < locations.length; i++) {
  let cordinates = [locations[i].Filter.CenterGeo.Lat,locations[i].Filter.CenterGeo.Lon];
  
  RentMarkers.push(
    L.circle(cordinates, {
      radius: markerSizerent(locations[i].AverageRents.Total),
      fillColor: markerColor(locations[i].AverageRents.Total),
      fillOpacity: 0.7,
      color: "black",
      stroke: true,
      weight: 0.7
    }).bindPopup("<h3>"+ locations[i].Filter.Center +"<h3><h3>Average Rent:$ "+ locations[i].AverageRents.Total.toFixed(2) + "<h3><h3>Vacancy Rate: "+ locations[i].AvearageVacancytRate.Total.toFixed(2) + "</h3>")
  );

  VRMarkers.push(
    L.circle(cordinates, {
      radius: markerSizevr(locations[i].AvearageVacancytRate.Total),
      fillColor: markerColorvr(locations[i].AvearageVacancytRate.Total),
      fillOpacity: 0.7,
      color: "black",
      stroke: true,
      weight: 0.7
    }).bindPopup("<h3>"+ locations[i].Filter.Center +"<h3><h3>Average Rent:$ "+ locations[i].AverageRents.Total.toFixed(2) + "<h3><h3>Vacancy Rate: "+ locations[i].AvearageVacancytRate.Total.toFixed(2) + "</h3>")
  );
//   UnitsMarkers.push(
//     L.circle(cordinates, {
//       stroke: false,
//       fillOpacity: 0.75,
//       color: "white",
//       fillColor: "purple",
//       radius: markerSizeunits(locations[i].TotalNumberOfUnits.Total)
//     })
//   );

};
console.log(RentMarkers)
console.log(VRMarkers)
// console.log(UnitsMarkers)

// Create the base layers.
let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})

let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

// Create  separate layer groups
let rents = L.layerGroup(RentMarkers);
let vacancyrate = L.layerGroup(VRMarkers);

// let units = L.layerGroup(UnitsMarkers);

// Create a baseMaps object.
let baseMaps = {
  "Street Map": street,
  "Topographic Map": topo,
};

// Create an overlay object.
let overlayMaps = {
  "Rents": rents,
  "Vacancy rate": vacancyrate,

};



// Define a map object.
let myMap = L.map("map", {
  center: [49.424721, -97.695000],
  zoom: 5,
  
  layers: [street, rents]
});

// Pass our map layers to our layer control.
// Add the layer control to the map.
L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(myMap);

var legend = L.control({position: "topright"});

legend.onAdd = function(map) {
    var div = L.DomUtil.create("div", "info legend"),
    Rents = [500 , 1000, 1200 , 1500 , 1800, 2000 , 2500 ];

    div.innerHTML += "<h3 style='text-align: center'>Rents</h3>"
    for (var i = 0; i < Rents.length; i++) {
    div.innerHTML +=
    '<i style="background:' + markerColor(Rents[i] + 1) + '"></i> ' +
    Rents[i] + (Rents[i + 1] ? '&ndash;' + Rents[i + 1] + '<br>' : '+');
        }
        return div;
    }  
legend.addTo(myMap)
// add second legend
var legend2 = L.control({position: "topright"});

legend2.onAdd = function(map) {
    var div = L.DomUtil.create("div", "info legend"),
    VR = [6,5,4,3,2,1 ]
    

    div.innerHTML += "<h3 style='text-align: center'> Vacancy rate</h3>"
    for (var i = 0; i < VR.length; i++) {
    div.innerHTML +=
    '<i style="background:' + markerColorvr(VR[i] + 1) + '"></i> ' +
    VR[i] + (VR[i + 1] ? '&ndash;' + VR[i + 1] + '<br>' : '+');
        }
        return div;
    }  
legend2.addTo(myMap)



