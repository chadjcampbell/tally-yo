import { CollectionCardProps } from "./CollectionCard";

export const CollectionModal = ({ item, userStore }: CollectionCardProps) => {
  let owned;
  let buyable;

  userStore?.items.includes(item["file-name"])
    ? (owned = true)
    : (owned = false);

  userStore?.tally >= item.price ? (buyable = true) : (buyable = false);

  const handleBuy = () => {};
  const handleSell = () => {};

  return <></>;
};
