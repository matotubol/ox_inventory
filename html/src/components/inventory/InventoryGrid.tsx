import React from "react";
import { InventoryProps, ItemProps } from "../../typings";
import Fade from "../utils/Fade";
import WeightBar from "../utils/WeightBar";
import InventorySlot from "./InventorySlot";

const InventoryGrid: React.FC<{ inventory: InventoryProps }> = (props) => {
  const [currentItem, setCurrentItem] = React.useState<ItemProps>();

  return (
    <div className="column-wrapper">
      <div
        className="row-wrapper"
        style={{ justifyContent: "space-between", marginBottom: "5px" }}
      >
        <div>
          {props.inventory.id} - {props.inventory.type}
        </div>
        {props.inventory.weight && (
          <div>
            {props.inventory.weight}/{props.inventory.maxWeight}kg
          </div>
        )}
      </div>
      {props.inventory.weight && props.inventory.maxWeight && (
        <div
          className="row-wrapper"
          style={{ marginBottom: "3px", marginRight: "4px" }}
        >
          <WeightBar
            percent={(props.inventory.weight / props.inventory.maxWeight) * 100}
          />
        </div>
      )}
      <div className="inventory-grid">
        {Array.from(
          { ...props.inventory.items, length: props.inventory.slots },
          (item, index) => item || { slot: index + 1 }
        ).map((item) => (
          <InventorySlot
            key={`${props.inventory.type}-${props.inventory.id}-${item.slot}-${item.name}`}
            item={item}
            inventory={{
              id: props.inventory.id,
              type: props.inventory.type,
            }}
            setCurrentItem={setCurrentItem}
          />
        ))}
      </div>

      <div
        className="row-wrapper"
        style={{ marginTop: "2vh", marginRight: "4px", height: "5vh" }}
      >
        <Fade
          visible={currentItem !== undefined}
          duration={0.25}
          className="item-info"
        >
          <p>{currentItem?.label}</p>
        </Fade>
      </div>
    </div>
  );
};

export default InventoryGrid;
