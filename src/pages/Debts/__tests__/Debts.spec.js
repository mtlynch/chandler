import React from 'react';
import toJson from 'enzyme-to-json';
import {shallow} from 'enzyme';
import {Debts} from '../Debts';

describe('Pages', () => {
  describe('Debts', () => {
    let back;
    let getDebtsByContact;

    beforeEach(() => {
      back = jest.fn();
      getDebtsByContact = jest.fn();
    });

    it('should renders correctly without debts and fetching', () => {
      const debts = [];
      const tree = shallow(
        <Debts
          back={back}
          getDebtsByContact={getDebtsByContact}
          isFetching={true}
          debts={debts}
        />,
      );
      expect(toJson(tree)).toMatchSnapshot();
    });

    it('should renders correctly without debts and not fetching', () => {
      const debts = [];
      const tree = shallow(
        <Debts
          back={back}
          getDebtsByContact={getDebtsByContact}
          isFetching={false}
          debts={debts}
        />,
      );
      expect(toJson(tree)).toMatchSnapshot();
    });

    it('should renders correctly with debts and fetching', () => {
      const debts = [
        {in_debt: 'yes', reason: 'My reason', contact: {first_name: 'Theo'}},
      ];
      const tree = shallow(
        <Debts
          back={back}
          getDebtsByContact={getDebtsByContact}
          isFetching={true}
          debts={debts}
        />,
      );
      expect(toJson(tree)).toMatchSnapshot();
      expect(
        toJson(shallow(tree.instance().renderItem({index: 0}))),
      ).toMatchSnapshot();
    });

    it('should renders correctly with debts and fetching', () => {
      const debts = [
        {in_debt: 'yes', reason: 'My reason', contact: {first_name: 'Theo'}},
        {in_debt: 'no', reason: 'My reason 2', contact: {first_name: 'Bill'}},
      ];
      const tree = shallow(
        <Debts
          back={back}
          getDebtsByContact={getDebtsByContact}
          isFetching={false}
          debts={debts}
        />,
      );
      expect(toJson(tree)).toMatchSnapshot();
      expect(
        toJson(shallow(tree.instance().renderItem({index: 0}))),
      ).toMatchSnapshot();
      expect(
        toJson(shallow(tree.instance().renderItem({index: 1}))),
      ).toMatchSnapshot();
    });

    it('should display the activity indicator in the footer if it is fetching', () => {
      const debts = [
        {body: 'My body', created_at: '1991-12-17'},
        {body: 'My body 2', created_at: '1993-12-17'},
      ];
      const tree = shallow(
        <Debts
          back={back}
          getDebtsByContact={getDebtsByContact}
          isFetching={true}
          debts={debts}
        />,
      );
      expect(toJson(shallow(tree.instance().renderFooter()))).toMatchSnapshot();
    });

    it('should not display the activity indicator in the footer if it is not fetching', () => {
      const debts = [
        {body: 'My body', created_at: '1991-12-17'},
        {body: 'My body 2', created_at: '1993-12-17'},
      ];
      const tree = shallow(
        <Debts
          back={back}
          getDebtsByContact={getDebtsByContact}
          isFetching={false}
          debts={debts}
        />,
      );
      expect(tree.instance().renderFooter()).toBeNull();
    });

    it('should have a keyExtractor', () => {
      const debts = [{id: 1}, {id: 2}];
      const tree = shallow(
        <Debts
          back={back}
          getDebtsByContact={getDebtsByContact}
          isFetching={false}
          debts={debts}
        />,
      );
      expect(tree.instance().keyExtractor(debts[0])).toBe('1');
      expect(tree.instance().keyExtractor(debts[1])).toBe('2');
    });
  });
});
