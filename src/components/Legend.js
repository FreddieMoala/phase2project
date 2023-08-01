import React from 'react';

export default function Legend() {

    return(
      <React.Fragment className="col">
              <div>
              <h2 className="ibu">IBU</h2>
              <p>
                Stands for International Bitterness Units, a scale that measures
                the bitterness of beer. IBU is based on the amount of hops and
                their alpha acids that are added to the beer. The higher the IBU,
                the more bitter the beer.
              </p>
              <h2 className="srm">SRM</h2>
              <p>
                The Standard Reference Method, abbreviated as SRM is the color
                system used by brewers to specify finished beer and malt color.
              </p>
              <h2 className="aLevel">Attenuation Level</h2>
              <p>
                Attenuation of beer is a measure of how fully fermentable the
                beers sugars are. It is usually expressed as a percentage, which
                can be interpreted as the percentage of extract in the beer that
                is converted to alcohol and carbon dioxide by the yeasts.
              </p>
            </div>
            </React.Fragment>
    )
}