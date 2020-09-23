# -*- coding: utf-8 -*-

# Form implementation generated from reading ui file 'carto_works_dialog_base.ui'
#
# Created by: PyQt5 UI code generator 5.9.2
#
# WARNING! All changes made in this file will be lost!

from PyQt5 import QtCore, QtGui, QtWidgets

class Ui_cartoWorksDialogBase(object):
    def setupUi(self, cartoWorksDialogBase):
        cartoWorksDialogBase.setObjectName("cartoWorksDialogBase")
        cartoWorksDialogBase.resize(400, 300)
        self.button_box = QtWidgets.QDialogButtonBox(cartoWorksDialogBase)
        self.button_box.setGeometry(QtCore.QRect(30, 240, 341, 32))
        self.button_box.setOrientation(QtCore.Qt.Horizontal)
        self.button_box.setStandardButtons(QtWidgets.QDialogButtonBox.Cancel|QtWidgets.QDialogButtonBox.Ok)
        self.button_box.setObjectName("button_box")
        self.label = QtWidgets.QLabel(cartoWorksDialogBase)
        self.label.setGeometry(QtCore.QRect(80, 120, 71, 16))
        self.label.setObjectName("label")
        self.label_2 = QtWidgets.QLabel(cartoWorksDialogBase)
        self.label_2.setGeometry(QtCore.QRect(80, 160, 71, 16))
        self.label_2.setObjectName("label_2")
        self.username_field = QtWidgets.QLineEdit(cartoWorksDialogBase)
        self.username_field.setGeometry(QtCore.QRect(150, 120, 201, 21))
        self.username_field.setObjectName("username_field")
        self.password_field = QtWidgets.QLineEdit(cartoWorksDialogBase)
        self.password_field.setGeometry(QtCore.QRect(150, 160, 201, 21))
        self.password_field.setEchoMode(QtWidgets.QLineEdit.Password)
        self.password_field.setObjectName("password_field")
        self.label_3 = QtWidgets.QLabel(cartoWorksDialogBase)
        self.label_3.setGeometry(QtCore.QRect(50, 20, 291, 61))
        self.label_3.setText("")
        self.label_3.setPixmap(QtGui.QPixmap("carto_logo.png"))
        self.label_3.setObjectName("label_3")
        self.label_4 = QtWidgets.QLabel(cartoWorksDialogBase)
        self.label_4.setGeometry(QtCore.QRect(190, 90, 41, 20))
        font = QtGui.QFont()
        font.setPointSize(14)
        self.label_4.setFont(font)
        self.label_4.setObjectName("label_4")

        self.retranslateUi(cartoWorksDialogBase)
        self.button_box.accepted.connect(cartoWorksDialogBase.accept)
        self.button_box.rejected.connect(cartoWorksDialogBase.reject)
        QtCore.QMetaObject.connectSlotsByName(cartoWorksDialogBase)

    def retranslateUi(self, cartoWorksDialogBase):
        _translate = QtCore.QCoreApplication.translate
        cartoWorksDialogBase.setWindowTitle(_translate("cartoWorksDialogBase", "Cartoworks"))
        self.label.setText(_translate("cartoWorksDialogBase", "Username"))
        self.label_2.setText(_translate("cartoWorksDialogBase", "Password"))
        self.label_4.setText(_translate("cartoWorksDialogBase", "Login"))


if __name__ == "__main__":
    import sys
    app = QtWidgets.QApplication(sys.argv)
    cartoWorksDialogBase = QtWidgets.QDialog()
    ui = Ui_cartoWorksDialogBase()
    ui.setupUi(cartoWorksDialogBase)
    cartoWorksDialogBase.show()
    sys.exit(app.exec_())

