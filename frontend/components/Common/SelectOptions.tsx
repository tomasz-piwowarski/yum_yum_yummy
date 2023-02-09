export function AfricanCategories() {
  return (
    <>
      <option value="east_african">East african</option>
      <option value="north_african">North african</option>
      <option value="south_african">South african</option>
      <option value="west_african">West african</option>
    </>
  );
}

export function AsianCategories() {
  return (
    <>
      <option value="central_asian">Central asian</option>
      <option value="east_asian">East asian</option>
      <option value="middle_east">Middle east</option>
      <option value="north_asian">North asian</option>
      <option value="south_asian">South asian</option>
      <option value="southeast_asian">Southeast asian</option>
    </>
  );
}

export function AmericanCategories() {
  return (
    <>
      <option value="carribean">Carribean</option>
      <option value="central_american">Central american</option>
      <option value="north_american">North american</option>
      <option value="south_american">South american</option>
    </>
  );
}

export function OceanicCategories() {
  return (
    <>
      <option value="australasian">Australasian</option>
      <option value="melanesian">Melanesian</option>
      <option value="micronesian">Micronesian</option>
      <option value="polynesian">Polynesian</option>
    </>
  );
}

export function EuropeanCategories() {
  return (
    <>
      <option value="central_european">Central european</option>
      <option value="eastern_european">Eastern european</option>
      <option value="northern_european">Northern european</option>
      <option value="southern_european">Southern european</option>
      <option value="western_european">Western european</option>
    </>
  );
}

export function CategoryOptions({ category }: { category: string }) {
  return (
    <>
      {
        {
          african: <AfricanCategories />,
          asian: <AsianCategories />,
          american: <AmericanCategories />,
          oceanic: <OceanicCategories />,
          european: <EuropeanCategories />,
        }[category]
      }
    </>
  );
}

export function RegionOptions() {
  return (
    <>
      <option value="african">African</option>
      <option value="american">American</option>
      <option value="asian">Asian</option>
      <option value="european">European</option>
      <option value="oceanic">Oceanic</option>
    </>
  );
}
