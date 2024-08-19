export default function PokemonCard({ name, imgUrl, onClick }) {
  return (
    <div className="card" onClick={onClick}>
      <img src={imgUrl} alt={name}/>
      <h3>{name}</h3>
    </div>
  );
}