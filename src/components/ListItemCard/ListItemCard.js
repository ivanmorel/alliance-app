import * as React from "react";
import { View } from "react-native";

import PropTypes from "prop-types";
import { Card, Text } from "react-native-paper";
import { scale } from "react-native-size-matters/extend";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import { Badge, OSRAvatar } from "@components";

import style from "./ListItemCard.style";

const ListItemCard = ({
  avatarText,
  subtitle,
  extraSubtitle,
  title = "",
  isNew = false,
  badgeCount = 0,
  subtitleLines = 1,
  caption,
  onPress,
  crown,
  icon,
  titleIcon,
  avatarIcon,
  containerStyle,
  titleStyle,
  subtitleStyle,
  avatarId,
}) => {
  return (
    <Card
      mode="elevated"
      elevation={0}
      style={[style.container, containerStyle]}
      onPress={onPress}
    >
      <Card.Content style={style.cardContent}>
        <View style={style.flexRow}>
          {avatarText ? (
            <React.Fragment>
              {crown ? (
                <View style={style.crown}>
                  <FontAwesome5
                    name="crown"
                    size={scale(12)}
                    color="rgba(51, 51, 51, 0.9)"
                  />
                </View>
              ) : null}
              <OSRAvatar
                size={48}
                label={avatarText}
                avatarStyle={style.avatar}
                labelStyle={style.avatarLabel}
                userId={avatarId}
              />
            </React.Fragment>
          ) : null}
          {avatarIcon ? avatarIcon : null}
          <View flex={1}>
            <View style={[style.flexRow, style.titleRowContainer]}>
              {titleIcon}
              <Text
                style={[style.title, style.flexGrow, titleStyle]}
                numberOfLines={1}
              >
                {title}
              </Text>
              <Text style={style.caption}>{caption}</Text>
            </View>
            <View style={style.flexRow}>
              <View style={style.flexGrow}>
                <Text
                  style={[style.subtitle, subtitleStyle]}
                  numberOfLines={subtitleLines}
                >
                  {subtitle}
                </Text>
                {extraSubtitle ? (
                  <Text
                    style={[style.subtitle, subtitleStyle]}
                    numberOfLines={1}
                  >
                    {extraSubtitle}
                  </Text>
                ) : null}
              </View>
              {icon ? icon : null}
              {isNew || badgeCount > 0 ? (
                <View style={style.iconContainer}>
                  {isNew ? (
                    <Badge isNew />
                  ) : (
                    <Badge number={badgeCount} maxNumberSymbol="" />
                  )}
                </View>
              ) : null}
            </View>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

export default ListItemCard;

ListItemCard.propTypes = {
  titleIcon: PropTypes.element,
  avatarText: PropTypes.string,
  badgeCount: PropTypes.number,
  caption: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  crown: PropTypes.bool,
  extraSubtitle: PropTypes.string,
  icon: PropTypes.element,
  isNew: PropTypes.bool,
  onPress: PropTypes.any,
  subtitle: PropTypes.any,
  subtitleLines: PropTypes.number,
  title: PropTypes.string,
  avatarIcon: PropTypes.element,
  containerStyle: PropTypes.object,
  titleStyle: PropTypes.object,
  subtitleStyle: PropTypes.object,
  avatarId: PropTypes.number,
};

ListItemCard.defaultProps = {
  badgeCount: 0,
  isNew: false,
  subtitleLines: 1,
  title: "",
};
