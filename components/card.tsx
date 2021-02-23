import { Recipe } from '../types/recipe';

export default function Card({ item, idx }: { item: Recipe; idx: number }) {
	return (
		<div className="card-container">
			<div className="card-content">
				<span className="card-content__id">{item.id}</span>
				<br />
				<span className="card-content__name">{item.name}</span>
			</div>
			<style>
				{`
        .card-container {
          display: inline-block;
          width: 180px;
          height: 80px;
          margin: 10px;
          border: solid 1px black;
          border-radius: 8px;
          text-align: center;
        }

        .card-content {
          display: table-cell;
          vertical-align: middle;
          width: inherit;
          height: inherit
        }

        .card-content__id {
          font-size: 12px;
        }
      `}
			</style>
		</div>
	);
}
